// src/types/react-markdown.d.ts




import "react-markdown";
import type { ComponentType, ReactNode } from "react";

declare module "react-markdown" {
  // Custom JSX TagName type if needed
  type TagName = keyof JSX.IntrinsicElements | string;

  export interface NormalComponents {
    [TagName: string]:
      | keyof JSX.IntrinsicElements
      | ComponentType<{ children?: ReactNode }>;
  }
}
