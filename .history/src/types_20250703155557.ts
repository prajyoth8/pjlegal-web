export type ParagraphBlock = {
  type: "paragraph" | "quote" | "heading_1" | "heading_2" | "heading_3" | "heading_4";
  text: string;
};

export type ListItem = {
  text?: string;
  blocks?: FormattedBlock[];
};

export type ListGroupBlock = {
  type: "bulleted_list_group" | "numbered_list_group";
  items: ListItem[];
};

export type CodeBlock = {
  type: "code_block";
  text: string;
};

export type FormattedBlock = ParagraphBlock | ListGroupBlock | CodeBlock;
