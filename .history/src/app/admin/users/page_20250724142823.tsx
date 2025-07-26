'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Input, Select, Table, Tabs, Card, Statistic, Tag, Modal, Spin, Button, Descriptions, Badge } from 'antd';
import type { TabsProps, TableColumnsType } from 'antd';
import dayjs from 'dayjs';

// Types
type User = {
  id: string;
  identifier: string;
  type: 'chatbot' | 'consultation' | 'both';
  email?: string;
  mobile?: string;
  full_name?: string;
  session_count: number;
  booking_count: number;
  first_seen: string;
  last_seen: string;
  is_offensive?: boolean;
  auth_method?: string;
  ip_address?: string;
  country_code?: string;
  device_info?: {
    browser?: string;
    os?: string;
    device?: string;
  };
};

type AnalyticsData = {
  date: string;
  unique_users: number;
  total_sessions: number;
  new_users: number;
  bookings: number;
};

type OffensiveContent = {
  id: string;
  user: string;
  prompt: string;
  response: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
};

export default function UsersPage() {
  // State management
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [offensiveContent, setOffensiveContent] = useState<OffensiveContent[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState({
    users: true,
    analytics: true,
    offensive: true
  });
  const [searchText, setSearchText] = useState('');
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [selectedUserType, setSelectedUserType] = useState<'all' | 'chatbot' | 'consultation' | 'offensive'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<OffensiveContent | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetailVisible, setUserDetailVisible] = useState(false);

  // Fetch data with error handling
  const fetchData = async () => {
    try {
      setLoading(prev => ({ ...prev, users: true, analytics: true, offensive: true }));
      
      // Fetch users
      const usersRes = await fetch('/api/admin/users');
      if (!usersRes.ok) throw new Error('Failed to fetch users');
      const usersData = await usersRes.json();
      setUsers(usersData || []);
      
      // Fetch analytics with retry logic
      try {
        const analyticsRes = await fetch(`/api/admin/analytics?range=${timeRange}`);
        if (!analyticsRes.ok) throw new Error('Failed to fetch analytics');
        let analyticsData = await analyticsRes.json();
        
        // Convert bigint to number if needed
        analyticsData = analyticsData.map((item: any) => ({
          ...item,
          unique_users: Number(item.unique_users),
          total_sessions: Number(item.total_sessions),
          new_users: Number(item.new_users),
          bookings: Number(item.bookings)
        }));
        
        setAnalyticsData(Array.isArray(analyticsData) ? analyticsData : []);
      } catch (analyticsError) {
        console.error('Analytics fetch error:', analyticsError);
        setAnalyticsData([]);
      }
      
      // Fetch offensive content
      const offensiveRes = await fetch('/api/admin/offensive-content');
      if (!offensiveRes.ok) throw new Error('Failed to fetch offensive content');
      const offensiveData = await offensiveRes.json();
      setOffensiveContent(Array.isArray(offensiveData) ? offensiveData : []);
    } catch (error: unknown) {
      console.error('Error fetching data:', error);
      const message = error instanceof Error ? error.message : 'Failed to fetch data';
      // Consider adding a toast notification here
    } finally {
      setLoading(prev => ({ ...prev, users: false, analytics: false, offensive: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  // Filter users
  useEffect(() => {
    let result = [...users];
    
    if (searchText) {
      result = result.filter(user => 
        user.identifier.toLowerCase().includes(searchText.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (selectedUserType !== 'all') {
      result = result.filter(user => {
        if (selectedUserType === 'chatbot') return user.session_count > 0;
        if (selectedUserType === 'consultation') return user.booking_count > 0;
        if (selectedUserType === 'offensive') return user.is_offensive;
        return true;
      });
    }
    
    setFilteredUsers(result);
  }, [users, searchText, selectedUserType]);

  // User detail view
  const showUserDetail = (user: User) => {
    setSelectedUser(user);
    setUserDetailVisible(true);
  };

  // Columns for user table
  const userColumns: TableColumnsType<User> = [
    {
      title: 'User',
      dataIndex: 'identifier',
      key: 'identifier',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">
            {record.email && `Email: ${record.email}`}
            {record.mobile && `Mobile: ${record.mobile}`}
          </div>
        </div>
      ),
      sorter: (a, b) => a.identifier.localeCompare(b.identifier),
    },
    {
      title: 'Type',
      key: 'type',
      render: (_, record) => (
        <div className="flex gap-1">
          {record.session_count > 0 && <Tag color="blue">Chatbot ({record.session_count})</Tag>}
          {record.booking_count > 0 && <Tag color="green">Consultation ({record.booking_count})</Tag>}
          {record.is_offensive && <Tag color="red">Offensive</Tag>}
        </div>
      ),
    },
    {
      title: 'First Seen',
      dataIndex: 'first_seen',
      key: 'first_seen',
      render: (text) => dayjs(text).format('MMM D, YYYY'),
      sorter: (a, b) => new Date(a.first_seen).getTime() - new Date(b.first_seen).getTime(),
    },
    {
      title: 'Last Activity',
      dataIndex: 'last_seen',
      key: 'last_seen',
      render: (text) => dayjs(text).format('MMM D, YYYY'),
      sorter: (a, b) => new Date(a.last_seen).getTime() - new Date(b.last_seen).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="link"
          onClick={() => showUserDetail(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  // User detail modal
  const UserDetailModal = () => (
    <Modal
      title="User Details"
      open={userDetailVisible}
      onCancel={() => setUserDetailVisible(false)}
      footer={[
        <Button key="back" onClick={() => setUserDetailVisible(false)}>
          Close
        </Button>,
      ]}
      width={800}
    >
      {selectedUser && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Identifier">{selectedUser.identifier}</Descriptions.Item>
          <Descriptions.Item label="Email">{selectedUser.email || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Mobile">{selectedUser.mobile || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Full Name">{selectedUser.full_name || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Type">
            <div className="flex gap-1">
              {selectedUser.session_count > 0 && <Tag color="blue">Chatbot</Tag>}
              {selectedUser.booking_count > 0 && <Tag color="green">Consultation</Tag>}
              {selectedUser.is_offensive && <Tag color="red">Offensive</Tag>}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Auth Method">
            <Tag color="purple">{selectedUser.auth_method || 'Unknown'}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="First Seen">{dayjs(selectedUser.first_seen).format('MMM D, YYYY h:mm A')}</Descriptions.Item>
          <Descriptions.Item label="Last Activity">{dayjs(selectedUser.last_seen).format('MMM D, YYYY h:mm A')}</Descriptions.Item>
          <Descriptions.Item label="Sessions">{selectedUser.session_count}</Descriptions.Item>
          <Descriptions.Item label="Bookings">{selectedUser.booking_count}</Descriptions.Item>
          {selectedUser.ip_address && (
            <Descriptions.Item label="IP Address">{selectedUser.ip_address}</Descriptions.Item>
          )}
          {selectedUser.country_code && (
            <Descriptions.Item label="Country">
              <Badge status="processing" text={selectedUser.country_code} />
            </Descriptions.Item>
          )}
          {selectedUser.device_info && (
            <Descriptions.Item label="Device Info">
              <div className="space-y-1">
                <div>Browser: {selectedUser.device_info.browser || 'Unknown'}</div>
                <div>OS: {selectedUser.device_info.os || 'Unknown'}</div>
                <div>Device: {selectedUser.device_info.device || 'Unknown'}</div>
              </div>
            </Descriptions.Item>
          )}
        </Descriptions>
      )}
    </Modal>
  );

  // Analytics chart component
  const AnalyticsChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => 
              timeRange === 'day' ? dayjs(value).format('h A') :
              timeRange === 'week' ? dayjs(value).format('ddd') :
              timeRange === 'month' ? dayjs(value).format('MMM D') :
              dayjs(value).format('MMM YYYY')
            } 
          />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'unique_users') return [value, 'Unique Users'];
              if (name === 'total_sessions') return [value, 'Total Sessions'];
              if (name === 'bookings') return [value, 'Consultations'];
              return [value, name];
            }}
            labelFormatter={(label) => {
              if (timeRange === 'day') return dayjs(label).format('MMM D, YYYY h A');
              if (timeRange === 'week') return dayjs(label).format('MMM D, YYYY');
              if (timeRange === 'month') return dayjs(label).format('MMMM YYYY');
              return dayjs(label).format('YYYY');
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="unique_users" stroke="#8884d8" name="Unique Users" />
          <Line type="monotone" dataKey="total_sessions" stroke="#82ca9d" name="Total Sessions" />
          <Line type="monotone" dataKey="bookings" stroke="#ffc658" name="Consultations" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Management Dashboard</h1>
        <Link href="/admin/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} loading={loading.users}>
            <Statistic
              title={stat.title}
              value={stat.value}
              precision={0}
            />
            <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
          </Card>
        ))}
      </div>

      {/* Analytics Section */}
      <Card 
        title="User Analytics" 
        className="mb-8" 
        loading={loading.analytics}
        extra={
          <Select
            value={timeRange}
            onChange={setTimeRange}
            options={[
              { value: 'day', label: 'Daily' },
              { value: 'week', label: 'Weekly' },
              { value: 'month', label: 'Monthly' },
              { value: 'year', label: 'Yearly' },
            ]}
            className="w-32"
          />
        }
      >
        {loading.analytics ? (
          <div className="h-80 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : analyticsData.length === 0 ? (
          <div className="h-80 flex items-center justify-center">
            <p>No analytics data available</p>
            <Button type="link" onClick={fetchData}>Retry</Button>
          </div>
        ) : (
          <AnalyticsChart />
        )}
      </Card>

      {/* User Detail Modal */}
      <UserDetailModal />

      {/* Offensive Content Modal */}
      <Modal
        title="Review Offensive Content"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="ban" danger>
            Ban User
          </Button>,
          <Button key="ignore" onClick={() => setIsModalOpen(false)}>
            Mark as Reviewed
          </Button>,
        ]}
        width={800}
      >
        {selectedContent && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">User:</h4>
              <p>{selectedContent.user}</p>
            </div>
            <div>
              <h4 className="font-medium">Prompt:</h4>
              <p className="bg-gray-100 p-2 rounded">{selectedContent.prompt}</p>
            </div>
            <div>
              <h4 className="font-medium">Response:</h4>
              <p className="bg-gray-100 p-2 rounded">{selectedContent.response}</p>
            </div>
            <div>
              <h4 className="font-medium">Date:</h4>
              <p>{dayjs(selectedContent.timestamp).format('MMM D, YYYY h:mm A')}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}