// types.ts
export type ChatbotSession = {
  id: string;
  email: string | null;
  mobile_number: string | null;
};

export type ChatbotRequest = {
  id: string;
  prompt: string;
  created_at: string;
  session_id: string;
  chatbot_responses: ChatbotResponse[];
};

export type ChatbotResponse = {
  id: string;
  response: string;
};

export type OffensiveContentItem = {
  id: string;
  user: string;
  prompt: string;
  response: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
};

export type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type HeadingBlock = {
  type: "heading";
  level: 1 | 2 | 3;
  text: string;
};

export type ListItem = {
  text: string;
  children?: ListItem[]; // ✅ for nesting support
};

export type NumberedListBlock = {
  type: "numbered_list_group";
  items: ListItem[];
};

export type BulletedListBlock = {
  type: "bulleted_list_group";
  items: ListItem[];
};

export type TableBlock = {
  type: "table";
  rows: string[][];
};

export type ButtonBlock = {
  type: "button";
  label: string;
  action: string;
};

export type FormattedBlock =
  | ParagraphBlock
  | HeadingBlock
  | BulletedListBlock
  | NumberedListBlock
  | TableBlock
  | ButtonBlock;
