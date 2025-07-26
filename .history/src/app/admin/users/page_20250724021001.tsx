// admin/users/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Input, Select, Table, Tabs, DatePicker, Card, Statistic, Tag, Modal } from 'antd';
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

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, users: true, analytics: true, offensive: true }));
        
        // Fetch users
        const usersRes = await fetch('/api/admin/users');
        const usersData = await usersRes.json();
        setUsers(usersData);
        
        // Fetch analytics
        const analyticsRes = await fetch(`/api/admin/analytics?range=${timeRange}`);
        const analyticsData = await analyticsRes.json();
        setAnalyticsData(analyticsData);
        
        // Fetch offensive content
        const offensiveRes = await fetch('/api/admin/offensive-content');
        const offensiveData = await offensiveRes.json();
        setOffensiveContent(offensiveData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(prev => ({ ...prev, users: false, analytics: false, offensive: false }));
      }
    };

    fetchData();
  }, [timeRange]);

  // Filter users based on search and filters
  useEffect(() => {
    let result = [...users];
    
    // Apply search filter
    if (searchText) {
      result = result.filter(user => 
        user.identifier.toLowerCase().includes(searchText.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Apply type filter
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
        <button 
          className="text-blue-600 hover:underline"
          onClick={() => {
            // Implement user detail view or actions
          }}
        >
          View Details
        </button>
      ),
    },
  ];

  // Columns for offensive content table
  const offensiveColumns: TableColumnsType<OffensiveContent> = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Prompt',
      dataIndex: 'prompt',
      key: 'prompt',
      render: (text) => (
        <div className="max-w-xs truncate hover:max-w-none">
          {text}
        </div>
      ),
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (text) => (
        <Tag color={
          text === 'high' ? 'red' : 
          text === 'medium' ? 'orange' : 'yellow'
        }>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => dayjs(text).format('MMM D, YYYY h:mm A'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <button 
          className="text-blue-600 hover:underline"
          onClick={() => {
            setSelectedContent(record);
            setIsModalOpen(true);
          }}
        >
          Review
        </button>
      ),
    },
  ];

  // Tab items
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'User Management',
      children: (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search users..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1"
            />
            <Select
              value={selectedUserType}
              onChange={setSelectedUserType}
              options={[
                { value: 'all', label: 'All Users' },
                { value: 'chatbot', label: 'Chatbot Users' },
                { value: 'consultation', label: 'Consultation Users' },
                { value: 'offensive', label: 'Offensive Users' },
              ]}
              className="w-full md:w-64"
            />
          </div>
          
          <Table
            columns={userColumns}
            dataSource={filteredUsers}
            rowKey="id"
            loading={loading.users}
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Offensive Content',
      children: (
        <Table
          columns={offensiveColumns}
          dataSource={offensiveContent}
          rowKey="id"
          loading={loading.offensive}
          pagination={{ pageSize: 10 }}
        />
      ),
    },
  ];

  // Stats cards data
  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      description: 'All unique users',
    },
    {
      title: 'Chatbot Users',
      value: users.filter(u => u.session_count > 0).length,
      description: 'Used chatbot at least once',
    },
    {
      title: 'Consultation Users',
      value: users.filter(u => u.booking_count > 0).length,
      description: 'Booked at least once',
    },
    {
      title: 'Offensive Users',
      value: users.filter(u => u.is_offensive).length,
      description: 'Flagged for offensive content',
    },
  ];

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
      <Card title="User Analytics" className="mb-8" loading={loading.analytics}>
        <div className="flex justify-end mb-4">
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
        </div>
        
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
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="unique_users" stroke="#8884d8" name="Unique Users" />
              <Line type="monotone" dataKey="total_sessions" stroke="#82ca9d" name="Total Sessions" />
              <Line type="monotone" dataKey="bookings" stroke="#ffc658" name="Consultations" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tabs for User Management and Offensive Content */}
      <Card>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Card>

      {/* Modal for reviewing offensive content */}
      <Modal
        title="Review Offensive Content"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <button key="ban" className="btn btn-danger">
            Ban User
          </button>,
          <button key="ignore" className="btn btn-secondary">
            Mark as Reviewed
          </button>,
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