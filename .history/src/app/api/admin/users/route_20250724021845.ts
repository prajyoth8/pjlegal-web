import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get chatbot users
    const { data: chatbotUsers, error: chatbotError } = await supabase
      .from('chatbot_sessions')
      .select(`
        id,
        email,
        mobile_number,
        started_at,
        is_active,
        chatbot_requests!inner(
          id,
          prompt,
          chatbot_responses!inner(
            response
          )
        )
      `)
      .order('started_at', { ascending: false });

    if (chatbotError) throw chatbotError;

    // Process chatbot users
    const processedChatbotUsers = chatbotUsers.map(session => {
      const hasOffensiveContent = session.chatbot_requests.some(request => 
        request.chatbot_responses.some(response => 
          isContentOffensive(request.prompt) || isContentOffensive(response.response)
        )
      );
      
      return {
        id: session.id,
        identifier: session.email || session.mobile_number,
        email: session.email,
        mobile: session.mobile_number,
        session_count: 1, // Will be aggregated later
        booking_count: 0,
        first_seen: session.started_at,
        last_seen: session.started_at,
        is_offensive: hasOffensiveContent
      };
    });

    // Get consultation users
    const { data: consultationUsers, error: consultationError } = await supabase
      .from('consultation_bookings')
      .select('id, email, phone, full_name, created_at')
      .order('created_at', { ascending: false });

    if (consultationError) throw consultationError;

    // Process consultation users
    const processedConsultationUsers = consultationUsers.map(booking => ({
      id: booking.id,
      identifier: booking.email,
      email: booking.email,
      mobile: booking.phone,
      full_name: booking.full_name,
      session_count: 0,
      booking_count: 1, // Will be aggregated later
      first_seen: booking.created_at,
      last_seen: booking.created_at,
      is_offensive: false
    }));

    // Combine and aggregate users
    const usersMap = new Map<string, any>();
    
    [...processedChatbotUsers, ...processedConsultationUsers].forEach(user => {
      if (usersMap.has(user.identifier)) {
        const existing = usersMap.get(user.identifier);
        usersMap.set(user.identifier, {
          ...existing,
          session_count: existing.session_count + user.session_count,
          booking_count: existing.booking_count + user.booking_count,
          first_seen: new Date(existing.first_seen) < new Date(user.first_seen) 
            ? existing.first_seen 
            : user.first_seen,
          last_seen: new Date(existing.last_seen) > new Date(user.last_seen) 
            ? existing.last_seen 
            : user.last_seen,
          is_offensive: existing.is_offensive || user.is_offensive,
          type: existing.session_count + user.session_count > 0 && 
               existing.booking_count + user.booking_count > 0
            ? 'both'
            : existing.session_count + user.session_count > 0
              ? 'chatbot'
              : 'consultation'
        });
      } else {
        usersMap.set(user.identifier, {
          ...user,
          type: user.session_count > 0 && user.booking_count > 0
            ? 'both'
            : user.session_count > 0
              ? 'chatbot'
              : 'consultation'
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

// Helper function to detect offensive content
function isContentOffensive(content: string): boolean {
  const bannedWords = ['banned-word1', 'banned-word2']; // Add your banned words
  return bannedWords.some(word => 
    content.toLowerCase().includes(word.toLowerCase())
  );
}