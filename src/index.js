import {initializePAL, isInitialized} from 'aurelia-pal';
import {_PLATFORM} from './platform';
import {_FEATURE} from './feature';
import {_DOM} from './dom';
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
export function initialize(): void {
  if (isInitialized) {
    return;
  }

  initializePAL((platform, feature, dom) => {
    Object.assign(platform, _PLATFORM);
    Object.assign(feature, _FEATURE);
    Object.assign(dom, _DOM);

    Object.defineProperty(dom, 'title', {
      get: () => document.title,
      set: (value) => { document.title = value; }
    });

    Object.defineProperty(dom, 'activeElement', {
      get: () => document.activeElement
    });

    Object.defineProperty(platform, 'XMLHttpRequest', {
      get: () => platform.global.XMLHttpRequest
    });
  });
}
