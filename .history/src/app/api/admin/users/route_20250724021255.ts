import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    // Get chatbot users
    const chatbotUsersQuery = `
      SELECT 
        id,
        COALESCE(email, mobile_number) as identifier,
        email,
        mobile_number as mobile,
        COUNT(*) as session_count,
        0 as booking_count,
        MIN(started_at) as first_seen,
        MAX(started_at) as last_seen,
        BOOL_OR(
          EXISTS (
            SELECT 1 FROM chatbot_requests cr 
            JOIN chatbot_responses cres ON cr.id = cres.request_id
            WHERE cr.session_id = cs.id 
            AND (cr.prompt ILIKE ANY($1) OR cres.response ILIKE ANY($1))
        ) as is_offensive
      FROM chatbot_sessions cs
      GROUP BY id, COALESCE(email, mobile_number), email, mobile_number
    `;

    // Get consultation users
    const consultationUsersQuery = `
      SELECT 
        id,
        email as identifier,
        email,
        phone as mobile,
        full_name,
        0 as session_count,
        COUNT(*) as booking_count,
        MIN(created_at) as first_seen,
        MAX(created_at) as last_seen,
        false as is_offensive
      FROM consultation_bookings
      GROUP BY id, email, phone, full_name
    `;

    const bannedWords = ['banned-word1', 'banned-word2']; // Add your banned words
    
    const [chatbotUsersRes, consultationUsersRes] = await Promise.all([
      pool.query(chatbotUsersQuery, [bannedWords]),
      pool.query(consultationUsersQuery)
    ]);

    // Combine and deduplicate users
    const usersMap = new Map<string, any>();
    
    chatbotUsersRes.rows.forEach(user => {
      usersMap.set(user.identifier, {
        ...user,
        type: 'chatbot'
      });
    });

    consultationUsersRes.rows.forEach(user => {
      if (usersMap.has(user.identifier)) {
        const existing = usersMap.get(user.identifier);
        usersMap.set(user.identifier, {
          ...existing,
          booking_count: user.booking_count,
          full_name: user.full_name || existing.full_name,
          type: existing.session_count > 0 ? 'both' : 'consultation'
        });
      } else {
        usersMap.set(user.identifier, {
          ...user,
          type: 'consultation'
        });
      }
    });

    return NextResponse.json(Array.from(usersMap.values()));
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}