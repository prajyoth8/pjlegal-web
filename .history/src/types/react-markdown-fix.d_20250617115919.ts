// src/types/react-markdown.d.ts

import "react-markdown";

import type { ComponentType, ReactNode } from "react";

declare module "react-markdown" {
  import type { ComponentType } from "react";

  // Force JSX typing to be broad enough
  type TagName = keyof JSX.IntrinsicElements | string;

  export interface NormalComponents {
    [TagName: string]: keyof JSX.IntrinsicElements | ComponentType<any>;
  }

  

    export interface NormalComponents {
    [TagName: string]: keyof JSX.IntrinsicElements | ComponentType<{ children?: ReactNode }>;
    }

}
