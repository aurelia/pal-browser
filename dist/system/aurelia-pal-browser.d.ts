declare module 'aurelia-pal-browser' {
  import { initializePAL }  from 'aurelia-pal';
  export const FEATURE: any;
  export const DOM: any;
  export const PLATFORM: any;
  export function initialize(): any;
}