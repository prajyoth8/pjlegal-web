import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || 'week';

  try {
    let truncate = 'week';
    let format = 'YYYY-MM-DD';
    
    switch (range) {
      case 'day':
        truncate = 'day';
        format = 'HH24:00';
        break;
      case 'month':
        truncate = 'month';
        format = 'YYYY-MM';
        break;
      case 'year':
        truncate = 'year';
        format = 'YYYY';
        break;
    }

    const query = `
      WITH dates AS (
        SELECT generate_series(
          date_trunc($1, NOW() - INTERVAL '1 ${range}'),
          date_trunc($1, NOW()),
          INTERVAL '1 ${range}'
        ) as date
      )
      SELECT
        to_char(d.date, $2) as date,
        COUNT(DISTINCT cs.id) as unique_users,
        COUNT(cs.id) as total_sessions,
        COUNT(DISTINCT CASE WHEN cs.started_at >= date_trunc($1, NOW() - INTERVAL '1 ${range}') THEN cs.id END) as new_users,
        COUNT(cb.id) as bookings
      FROM dates d
      LEFT JOIN chatbot_sessions cs ON date_trunc($1, cs.started_at) = d.date
      LEFT JOIN consultation_bookings cb ON date_trunc($1, cb.created_at) = d.date
      GROUP BY d.date
      ORDER BY d.date
    `;

    const result = await pool.query(query, [truncate, format]);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}