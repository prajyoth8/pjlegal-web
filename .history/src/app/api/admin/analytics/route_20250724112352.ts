import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || 'week';

  try {
    let interval = '1 week';
    let dateTrunc = 'week';
    let dateFormat = 'YYYY-MM-DD';

    switch (range) {
      case 'day':
        interval = '1 day';
        dateTrunc = 'day';
        dateFormat = 'HH24:00';
        break;
      case 'month':
        interval = '1 month';
        dateTrunc = 'month';
        dateFormat = 'YYYY-MM';
        break;
      case 'year':
        interval = '1 year';
        dateTrunc = 'year';
        dateFormat = 'YYYY';
        break;
    }

    // Query for chatbot sessions
    const { data: sessionData, error: sessionError } = await supabase.rpc('get_date_series_analytics', {
      interval_param: interval,
      truncate_param: dateTrunc,
      format_param: dateFormat,
      table_name: 'chatbot_sessions',
      date_column: 'started_at'
    });

    if (sessionError) throw sessionError;

    // Query for consultation bookings
    const { data: bookingData, error: bookingError } = await supabase.rpc('get_date_series_analytics', {
      interval_param: interval,
      truncate_param: dateTrunc,
      format_param: dateFormat,
      table_name: 'consultation_bookings',
      date_column: 'created_at'
    });

    if (bookingError) throw bookingError;

    // Combine results
    const analyticsData = sessionData.map(session => {
      const booking = bookingData.find(b => b.date === session.date) || { count: 0 };
      return {
        date: session.date,
        unique_users: session.unique_count,
        total_sessions: session.total_count,
        new_users: session.new_count,
        bookings: booking.count
      };
    });

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}