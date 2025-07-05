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
};

export type BulletedListBlock = {
  type: "bulleted_list_group";
  items: ListItem[];
};

export type NumberedListBlock = {
  type: "numbered_list_group";
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
