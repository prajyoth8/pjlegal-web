// src/types/react-markdown.d.ts

import "react-markdown";

declare module "react-markdown" {
  import type { ComponentType } from "react";

  // Force JSX typing to be broad enough
  type TagName = keyof JSX.IntrinsicElements | string;

  export interface NormalComponents {
    [TagName: string]: keyof JSX.IntrinsicElements | ComponentType<any>;
  }

  export interface SpecialComponents {
    [nodeType: string]: ComponentType<any>;
  }
}
