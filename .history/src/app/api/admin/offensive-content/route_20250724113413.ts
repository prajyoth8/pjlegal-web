import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type SessionType = {
  email?: string | null;
  mobile_number?: string | null;
};

type OffensiveContentItem = {
  id: string;
  user: string;
  prompt: string;
  response: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
};

export async function GET() {
  try {
    const bannedWords = ['banned-word1', 'banned-word2'];
    const promptFilters = bannedWords.map(word => `prompt.ilike.%${word}%`).join(',');
    const responseFilters = bannedWords.map(word => `chatbot_responses.response.ilike.%${word}%`).join(',');

    const { data, error } = await supabase
      .from('chatbot_requests')
      .select(`
        id,
        prompt,
        created_at,
        session:session_id(email, mobile_number),
        chatbot_responses(response)
      `)
      .or(promptFilters)
      .or(responseFilters, { foreignTable: 'chatbot_responses' })
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    const offensiveContent: OffensiveContentItem[] = (data || []).map(item => {
      const session = item.session as SessionType | null;
      const userIdentifier = session?.email || session?.mobile_number || 'Unknown';
      
      return {
        id: item.id,
        user: userIdentifier,
        prompt: item.prompt,
        response: item.chatbot_responses?.[0]?.response || '',
        timestamp: item.created_at,
        severity: getSeverity(item.prompt, item.chatbot_responses?.[0]?.response)
      };
    });

    return NextResponse.json(offensiveContent);
  } catch (error) {
    console.error('Error fetching offensive content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offensive content' },
      { status: 500 }
    );
  }
}

function getSeverity(prompt: string, response?: string): 'low' | 'medium' | 'high' {
  const content = `${prompt} ${response || ''}`.toLowerCase();
  const bannedWordsHigh = ['severeword1', 'severeword2'];
  const bannedWordsMedium = ['moderateword1', 'moderateword2'];
  
  if (bannedWordsHigh.some(word => content.includes(word))) return 'high';
  if (bannedWordsMedium.some(word => content.includes(word))) return 'medium';
  return 'low';
}