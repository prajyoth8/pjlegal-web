import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { OffensiveContentItem } from '@/types';

type SupabaseOffensiveContentResponse = {
  id: string;
  prompt: string;
  created_at: string;
  session: {
    email: string | null;
    mobile_number: string | null;
  };
  chatbot_responses: {
    response: string;
  }[];
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('chatbot_requests')
      .select(`
        id,
        prompt,
        created_at,
        session:session_id(email, mobile_number),
        chatbot_responses(response)
      `)
      .or('prompt.ilike.%banned-word1%,prompt.ilike.%banned-word2%,chatbot_responses.response.ilike.%banned-word1%,chatbot_responses.response.ilike.%banned-word2%')
      .order('created_at', { ascending: false })
      .limit(100)
      .returns<SupabaseOffensiveContentResponse[]>();

    if (error) throw error;
    if (!data) return NextResponse.json([]);

    const offensiveContent: OffensiveContentItem[] = data.map(item => {
      const userIdentifier = item.session?.email || item.session?.mobile_number || 'Unknown';
      const responseText = item.chatbot_responses[0]?.response || '';
      
      return {
        id: item.id,
        user: userIdentifier,
        prompt: item.prompt,
        response: responseText,
        timestamp: item.created_at,
        severity: getSeverity(item.prompt, responseText)
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

function getSeverity(prompt: string, response: string): 'low' | 'medium' | 'high' {
  const bannedWordsHigh = ['severeword1', 'severeword2'];
  const bannedWordsMedium = ['moderateword1', 'moderateword2'];
  
  if (bannedWordsHigh.some(word => 
    prompt.toLowerCase().includes(word.toLowerCase()) || 
    response.toLowerCase().includes(word.toLowerCase()))
  ) {
    return 'high';
  }
  
  if (bannedWordsMedium.some(word => 
    prompt.toLowerCase().includes(word.toLowerCase()) || 
    response.toLowerCase().includes(word.toLowerCase()))
  ) {
    return 'medium';
  }
  
  return 'low';
}