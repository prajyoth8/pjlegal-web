import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const query = `
      SELECT
        cr.id,
        COALESCE(cs.email, cs.mobile_number) as user,
        cr.prompt,
        cres.response,
        cr.created_at as timestamp,
        CASE
          WHEN cr.prompt ILIKE ANY($1) THEN 'high'
          WHEN cres.response ILIKE ANY($1) THEN 'medium'
          ELSE 'low'
        END as severity
      FROM chatbot_requests cr
      JOIN chatbot_sessions cs ON cr.session_id = cs.id
      JOIN chatbot_responses cres ON cr.id = cres.request_id
      WHERE cr.prompt ILIKE ANY($1) OR cres.response ILIKE ANY($1)
      ORDER BY cr.created_at DESC
      LIMIT 100
    `;

    const bannedWords = ['banned-word1', 'banned-word2']; // Add your banned words
    const result = await pool.query(query, [bannedWords]);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching offensive content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offensive content' },
      { status: 500 }
    );
  }
}