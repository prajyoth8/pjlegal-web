import { NextResponse } from 'next/server';
import { supabase } from '@/lib/';

export async function GET() {
  try {
    // Define your banned words
    const bannedWords = [
      'banned-word1',
      'banned-word2',
      // Add more words as needed
    ];

    // Create filter conditions
    const promptFilters = bannedWords.map(word => `prompt.ilike.%${word}%`).join(',');
    const responseFilters = bannedWords.map(word => `chatbot_responses.response.ilike.%${word}%`).join(',');

    // Build the query
    let query = supabase
      .from('chatbot_requests')
      .select(`
        id,
        prompt,
        created_at,
        session:session_id(email, mobile_number),
        chatbot_responses(response)
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    // Apply filters with proper syntax
    if (promptFilters) {
      query = query.or(promptFilters);
    }
    if (responseFilters) {
      query = query.or(responseFilters, { foreignTable: 'chatbot_responses' });
    }

    const { data, error } = await query;

    if (error) throw error;

    const offensiveContent = (data || []).map(item => ({
      id: item.id,
      user: item.session?.email || item.session?.mobile_number || 'Unknown',
      prompt: item.prompt,
      response: item.chatbot_responses?.[0]?.response || '',
      timestamp: item.created_at,
      severity: getSeverity(item.prompt, item.chatbot_responses?.[0]?.response)
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

function getSeverity(prompt: string, response: string = ''): 'low' | 'medium' | 'high' {
  const bannedWordsHigh = ['severeword1', 'severeword2'];
  const bannedWordsMedium = ['moderateword1', 'moderateword2'];
  
  const content = `${prompt} ${response}`.toLowerCase();
  
  if (bannedWordsHigh.some(word => content.includes(word.toLowerCase()))) {
    return 'high';
  }
  
  if (bannedWordsMedium.some(word => content.includes(word.toLowerCase()))) {
    return 'medium';
  }
  
  return 'low';
}