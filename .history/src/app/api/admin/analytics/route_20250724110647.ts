import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || 'week';

  try {
    // Determine date truncation based on range
    let truncate = 'week';
    switch (range) {
      case 'day': truncate = 'day'; break;
      case 'month': truncate = 'month'; break;
      case 'year': truncate = 'year'; break;
    }

    // Get chatbot session analytics
    const { data: sessionAnalytics, error: sessionError } = await supabase
      .rpc('get_analytics', {
        table_name: 'chatbot_sessions',
        date_column: 'started_at',
        truncate_param: truncate
      });

    if (sessionError) throw sessionError;

    // Get consultation booking analytics
    const { data: bookingAnalytics, error: bookingError } = await supabase
      .rpc('get_analytics', {
        table_name: 'consultation_bookings',
        date_column: 'created_at',
        truncate_param: truncate
      });

    if (bookingError) throw bookingError;

    // Combine analytics data
    const analyticsData = sessionAnalytics.map((session: any) => {
      const booking = bookingAnalytics.find((b: any) => b.date === session.date) || { count: 0 };
      return {
        date: session.date,
        unique_users: session.unique_count,
        total_sessions: session.total_count,
        new_users: session.new_count,
        bookings: booking.count
      };
    });

    return NextResponse.json(analyticsData);
  } // Ensure we always return an array
    const result = await query(analyticsQuery, [truncate, format]);
    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json([], { status: 500 });
  }
}