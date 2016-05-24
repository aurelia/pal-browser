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

    (function(global) {
      global.console = global.console || {};
      let con = global.console;
      let prop;
      let method;
      let empty = {};
      let dummy = function() {};
      let properties = 'memory'.split(',');
      let methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
         'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
         'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
      while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
      while (method = methods.pop()) if (!con[method]) con[method] = dummy;
    })(platform.global);

    if (platform.global.console && typeof console.log === 'object') {
      ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function(method) {
        console[method] = this.bind(console[method], console);
      }, Function.prototype.call);
    }

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
