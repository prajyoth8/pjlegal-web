import "react-markdown";
import type { ComponentType, ReactNode, JSX } from "react";

declare module "react-markdown" {
  type TagName = keyof JSX.IntrinsicElements | string;

  export interface NormalComponents {
    [TagName: string]:
      | keyof JSX.IntrinsicElements
      | ComponentType<{ children?: ReactNode }>;
  }
}
