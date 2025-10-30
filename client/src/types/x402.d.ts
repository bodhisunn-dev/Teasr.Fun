declare module "x402/types" {
  // Minimal type declarations — extend as needed
  export interface X402Options {
    network?: string;
    wallet?: string;
  }

  export function connect(options: X402Options): void;
  export function someOtherFunction(...args: any[]): any;
}
