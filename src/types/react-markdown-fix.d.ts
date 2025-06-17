// src/types/react-markdown-fix.d.ts

export {}; // Prevents global scope pollution

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: JSX.IntrinsicElements[keyof JSX.IntrinsicElements];
    }
  }
}
