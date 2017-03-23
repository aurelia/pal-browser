import {
  initializePAL,
  isInitialized
} from 'aurelia-pal';

// DOM polyfills
// Actually inlined by our build because of build/paths.js but `import "m"` is not properly removed!?
// import './console';
// import './custom-event';
// import './function-name';
// import './html-template-element';
// import './element-matches';
// import './class-list';
// import './performance';
/**
* Initializes the PAL with the Browser-targeted implementation.
*/
export declare function initialize(): void;