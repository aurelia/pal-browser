import {initializePAL} from 'aurelia-pal';
import {PLATFORM} from './platform';
import {FEATURE} from './feature';
import {DOM} from './dom';
import {ensureCustomEvent} from './custom-event';
import {ensureFunctionName} from './function-name';
import {ensureHTMLTemplateElement} from './html-template-element';
import {ensureElementMatches} from './element-matches';
import {ensureClassList} from './class-list';

let isInitialized = false;

export function initialize(): void {
  if (isInitialized) {
    return;
  }

  isInitialized = true;

  ensureCustomEvent();
  ensureFunctionName();
  ensureHTMLTemplateElement();
  ensureElementMatches();
  ensureClassList();

  initializePAL((platform, feature, dom) => {
    Object.assign(platform, PLATFORM);
    Object.assign(feature, FEATURE);
    Object.assign(dom, DOM);

    Object.defineProperty(dom, 'title', {
      get: function() {
        return document.title;
      },
      set: function(value) {
        document.title = value;
      }
    });

    Object.defineProperty(platform, 'XMLHttpRequest', {
      get: function() {
        return PLATFORM.global.XMLHttpRequest;
      }
    });
  });
}
