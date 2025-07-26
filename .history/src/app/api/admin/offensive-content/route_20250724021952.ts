import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('chatbot_requests')
      .select(`
        id,
        prompt,
        created_at,
        session:session_id(email, mobile_number),
        response:chatbot_responses(response)
      `)
      .or('prompt.ilike.%banned-word1%,prompt.ilike.%banned-word2%,response.response.ilike.%banned-word1%,response.response.ilike.%banned-word2%')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    const offensiveContent = data.map(item => ({
      id: item.id,
      user: item.session?.email || item.session?.mobile_number || 'Unknown',
      prompt: item.prompt,
      response: item.response[0]?.response || '',
      timestamp: item.created_at,
      severity: getSeverity(item.prompt, item.response[0]?.response)
    }));

    return NextResponse.json(offensiveContent);
  } catch (error) {
    console.error('Error fetching offensive content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offensive content' },
      { status: 500 }
    );
  }
}

function getSeverity(prompt: string, response: string): 'low' | 'medium' | 'high' {
  const bannedWordsHigh = ['severeword1', 'severeword2'];
  const bannedWordsMedium = ['moderateword1', 'moderateword2'];
  
  if (bannedWordsHigh.some(word => 
    prompt.toLowerCase().includes(word) || 
    (response && response.toLowerCase().includes(word))
  ) {
    return 'high';
  }
  
  if (bannedWordsMedium.some(word => 
    prompt.toLowerCase().includes(word) || 
    (response && response.toLowerCase().includes(word))
  ) {
    return 'medium';
  }
  
  return 'low';
}