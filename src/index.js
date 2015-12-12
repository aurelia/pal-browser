import {initializePAL} from 'aurelia-pal';
import {_PLATFORM} from './platform';
import {_FEATURE} from './feature';
import {_DOM} from './dom';
import {_ensureCustomEvent} from './custom-event';
import {_ensureFunctionName} from './function-name';
import {_ensureHTMLTemplateElement} from './html-template-element';
import {_ensureElementMatches} from './element-matches';
import {_ensureClassList} from './class-list';
import {_ensurePerformance} from './performance';

let isInitialized = false;

/**
* Initializes the PAL with the Browser-targeted implementation.
*/
export function initialize(): void {
  if (isInitialized) {
    return;
  }

  isInitialized = true;

  _ensureCustomEvent();
  _ensureFunctionName();
  _ensureHTMLTemplateElement();
  _ensureElementMatches();
  _ensureClassList();
  _ensurePerformance();

  initializePAL((platform, feature, dom) => {
    Object.assign(platform, _PLATFORM);
    Object.assign(feature, _FEATURE);
    Object.assign(dom, _DOM);

    Object.defineProperty(dom, 'title', {
      get: function() {
        return document.title;
      },
      set: function(value) {
        document.title = value;
      }
    });

    Object.defineProperty(dom, 'activeElement', {
      get: function() {
        return document.activeElement;
      }
    });

    Object.defineProperty(platform, 'XMLHttpRequest', {
      get: function() {
        return platform.global.XMLHttpRequest;
      }
    });
  });
}
