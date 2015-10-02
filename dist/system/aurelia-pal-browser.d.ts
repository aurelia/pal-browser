declare module 'aurelia-pal-browser' {
  import { initializePAL }  from 'aurelia-pal';
  export function ensureFunctionName(): void;
  export function ensureClassList(): void;
  export function ensureCustomEvent(): void;
  export function ensureElementMatches(): void;
  export const FEATURE: any;
  export function ensureHTMLTemplateElement(): void;
  export const DOM: any;
  export const PLATFORM: any;
  export function initialize(): void;
}