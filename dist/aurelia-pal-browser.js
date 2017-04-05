import {initializePAL,isInitialized} from 'aurelia-pal';

export const _PLATFORM = {
  location: window.location,
  history: window.history,
  addEventListener(eventName: string, callback: Function, capture: boolean): void {
    this.global.addEventListener(eventName, callback, capture);
  },
  removeEventListener(eventName: string, callback: Function, capture: boolean): void {
    this.global.removeEventListener(eventName, callback, capture);
  },
  performance: window.performance,
  requestAnimationFrame(callback: Function): number {
    return this.global.requestAnimationFrame(callback);
  }
};

if (typeof FEATURE_NO_IE === 'undefined') {
  // Fix Function#name on browsers that do not support it (IE):
  function test() {}

  // Fix: don't shorten to `!test.name` as minifiers may remove the `test` function name,
  // which results in `test.name === ''`, which is falsy.
  if (test.name === undefined) {
    Object.defineProperty(Function.prototype, 'name', {
      get: function() {
        let name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
        // For better performance only parse once, and then cache the
        // result through a new accessor for repeated access.
        Object.defineProperty(this, 'name', { value: name });
        return name;
      }
    });
  }
}

if (typeof FEATURE_NO_IE === 'undefined') { 
  /*
   * classList polyfill. Forked from https://github.com/eligrey/classList.js
   *
   * Original impelementation by Eli Grey, http://eligrey.com
   * License: Dedicated to the public domain.
   *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
   */

  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (!('classList' in document.createElement('_')) || document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
    let protoProp = 'prototype';
    let strTrim = String.prototype.trim;
    let arrIndexOf = Array.prototype.indexOf;
    let emptyArray = [];

    let DOMEx = function(type, message) {
      this.name = type;
      this.code = DOMException[type];
      this.message = message;
    };

    let checkTokenAndGetIndex = function(classList, token) {
      if (token === '') {
        throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
      }

      if (/\s/.test(token)) {
        throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
      }

      return arrIndexOf.call(classList, token);
    };

    let ClassList = function(elem) {
      let trimmedClasses = strTrim.call(elem.getAttribute('class') || '');
      let classes = trimmedClasses ? trimmedClasses.split(/\s+/) : emptyArray;

      for (let i = 0, ii = classes.length; i < ii; ++i) {
        this.push(classes[i]);
      }

      this._updateClassName = function() {
        elem.setAttribute('class', this.toString());
      };
    };

    let classListProto = ClassList[protoProp] = [];

    // Most DOMException implementations don't allow calling DOMException's toString()
    // on non-DOMExceptions. Error's toString() is sufficient here.
    DOMEx[protoProp] = Error[protoProp];

    classListProto.item = function(i) {
      return this[i] || null;
    };

    classListProto.contains = function(token) {
      token += '';
      return checkTokenAndGetIndex(this, token) !== -1;
    };

    classListProto.add = function() {
      let tokens = arguments;
      let i = 0;
      let ii = tokens.length;
      let token;
      let updated = false;

      do {
        token = tokens[i] + '';
        if (checkTokenAndGetIndex(this, token) === -1) {
          this.push(token);
          updated = true;
        }
      } while (++i < ii);

      if (updated) {
        this._updateClassName();
      }
    };

    classListProto.remove = function() {
      let tokens = arguments;
      let i = 0;
      let ii = tokens.length;
      let token;
      let updated = false;
      let index;

      do {
        token = tokens[i] + '';
        index = checkTokenAndGetIndex(this, token);
        while (index !== -1) {
          this.splice(index, 1);
          updated = true;
          index = checkTokenAndGetIndex(this, token);
        }
      } while (++i < ii);

      if (updated) {
        this._updateClassName();
      }
    };

    classListProto.toggle = function(token, force) {
      token += '';

      let result = this.contains(token);
      let method = result ? force !== true && 'remove' : force !== false && 'add';

      if (method) {
        this[method](token);
      }

      if (force === true || force === false) {
        return force;
      }

      return !result;
    };

    classListProto.toString = function() {
      return this.join(' ');
    };

    Object.defineProperty(Element.prototype, 'classList', {
      get: function() {
        return new ClassList(this);
      },
      enumerable: true,
      configurable: true
    });
  } else {
    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.
    let testElement = document.createElement('_');
    testElement.classList.add('c1', 'c2');

    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains('c2')) {
      let createMethod = function(method) {
        let original = DOMTokenList.prototype[method];

        DOMTokenList.prototype[method] = function(token) {
          for (let i = 0, ii = arguments.length; i < ii; ++i) {
            token = arguments[i];
            original.call(this, token);
          }
        };
      };

      createMethod('add');
      createMethod('remove');
    }

    testElement.classList.toggle('c3', false);

    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains('c3')) {
      let _toggle = DOMTokenList.prototype.toggle;

      DOMTokenList.prototype.toggle = function(token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        }

        return _toggle.call(this, token);
      };
    }

    testElement = null;
  }
}

if (typeof FEATURE_NO_IE === 'undefined') {
  // performance polyfill. Copied from https://gist.github.com/paulirish/5438650

  // https://gist.github.com/paulirish/5438650
  // @license http://opensource.org/licenses/MIT
  // copyright Paul Irish 2015

  if ('performance' in window === false) {
    window.performance = {};
  }

  if ('now' in window.performance === false) {
    let nowOffset = Date.now();

    if (performance.timing && performance.timing.navigationStart) {
      nowOffset = performance.timing.navigationStart;
    }

    window.performance.now = function now() {
      return Date.now() - nowOffset;
    };
  }

  _PLATFORM.performance = window.performance;
}

if (typeof FEATURE_NO_IE === 'undefined') {
  // References to IE 9 in this file mean the *real* IE 9 browser, not IE 11 in 9 emulation mode.
  // Note that in IE 9, until the F12 are actually opened window.console is undefined!
  let con = window.console = window.console || {};  
  let nop = function() {};
  // console.memory is actually Chrome-only at this point, 
  // but Aurelia does not use it so we're cutting down on "polyfills" here.
  // Moreover, that object is utterly useless in other browsers, as all stats would actually be 'undefined'
  if (!con.memory) con.memory = {};
  ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
   'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
   'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn')
    .split(',')
    .forEach(m => { if (!con[m]) con[m] = nop; });

  // This is really f***ed up IE 9 stuff.
  // You can be in a situation where console.log is an object, not a function.
  // And the magic voodoo below that should _not_ work (the Function.prototype.call.bind(object,...) part)
  // actually kicks IE 9 into converting that object into a real function that actually logs stuff.
  // See http://patik.com/blog/complete-cross-browser-console-log/
  if (typeof con.log === 'object') {
    'log,info,warn,error,assert,dir,clear,profile,profileEnd'
      .split(',')
      .forEach(function(method) {
        console[method] = this.bind(console[method], console);
      }, Function.prototype.call);
  }
}

if (typeof FEATURE_NO_IE === 'undefined') {
  if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
    let CustomEvent = function(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };

      let evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
}

if (Element && !Element.prototype.matches) {
  let proto = Element.prototype;
  proto.matches = proto.matchesSelector ||
    proto.mozMatchesSelector || proto.msMatchesSelector ||
    proto.oMatchesSelector || proto.webkitMatchesSelector;
}

export const _FEATURE = {
  shadowDOM: !!HTMLElement.prototype.attachShadow,
  scopedCSS: 'scoped' in document.createElement('style'),
  htmlTemplateElement: 'content' in document.createElement('template'),
  mutationObserver: !!(window.MutationObserver || window.WebKitMutationObserver),
  ensureHTMLTemplateElement: t => t,
};

if (typeof FEATURE_NO_IE === 'undefined') {
  function isSVGTemplate(el) {
    return el.tagName === 'template' &&
           el.namespaceURI === 'http://www.w3.org/2000/svg';
  }

  function fixSVGTemplateElement(el) {
    let template = el.ownerDocument.createElement('template');
    let attrs = el.attributes;
    let length = attrs.length;
    let attr;

    el.parentNode.insertBefore(template, el);

    while (length-- > 0) {
      attr = attrs[length];
      template.setAttribute(attr.name, attr.value);
      el.removeAttribute(attr.name);
    }

    el.parentNode.removeChild(el);

    return fixHTMLTemplateElement(template);
  }

  function fixHTMLTemplateElement(template) {
    let content = template.content = document.createDocumentFragment();
    let child;

    while (child = template.firstChild) {
      content.appendChild(child);
    }

    return template;
  }

  function fixHTMLTemplateElementRoot(template) {
    let content = fixHTMLTemplateElement(template).content;
    let childTemplates = content.querySelectorAll('template');

    for (let i = 0, ii = childTemplates.length; i < ii; ++i) {
      let child = childTemplates[i];

      if (isSVGTemplate(child)) {
        fixSVGTemplateElement(child);
      } else {
        fixHTMLTemplateElement(child);
      }
    }

    return template;
  }

  if (!_FEATURE.htmlTemplateElement) {  
    _FEATURE.ensureHTMLTemplateElement = fixHTMLTemplateElementRoot;
  }
}

let shadowPoly = window.ShadowDOMPolyfill || null;

/**
* Represents the core APIs of the DOM.
*/
export const _DOM = {
  Element: Element,
  SVGElement: SVGElement,
  boundary: 'aurelia-dom-boundary',
  addEventListener(eventName: string, callback: Function, capture?: boolean): void {
    document.addEventListener(eventName, callback, capture);
  },
  removeEventListener(eventName: string, callback: Function, capture?: boolean): void {
    document.removeEventListener(eventName, callback, capture);
  },
  adoptNode(node: Node) {
    return document.adoptNode(node, true);//TODO: what is does the true mean? typo?
  },
  createElement(tagName: string): Element {
    return document.createElement(tagName);
  },
  createTextNode(text) {
    return document.createTextNode(text);
  },
  createComment(text) {
    return document.createComment(text);
  },
  createDocumentFragment(): DocumentFragment {
    return document.createDocumentFragment();
  },
  createMutationObserver(callback: Function): MutationObserver {
    return new (window.MutationObserver || window.WebKitMutationObserver)(callback);
  },
  createCustomEvent(eventType: string, options: Object): CustomEvent {
    return new window.CustomEvent(eventType, options);
  },
  dispatchEvent(evt): void {
    document.dispatchEvent(evt);
  },
  getComputedStyle(element: Element) {
    return window.getComputedStyle(element);
  },
  getElementById(id: string): Element {
    return document.getElementById(id);
  },
  querySelectorAll(query: string) {
    return document.querySelectorAll(query);
  },
  nextElementSibling(element: Node): Element {
    if (element.nextElementSibling) { return element.nextElementSibling; }
    do { element = element.nextSibling; }
    while (element && element.nodeType !== 1);
    return element;
  },
  createTemplateFromMarkup(markup: string): Element {
    let parser = document.createElement('div');
    parser.innerHTML = markup;

    let temp = parser.firstElementChild;
    if (!temp || temp.nodeName !== 'TEMPLATE') {
      throw new Error('Template markup must be wrapped in a <template> element e.g. <template> <!-- markup here --> </template>');
    }

    return _FEATURE.ensureHTMLTemplateElement(temp);
  },
  appendNode(newNode: Node, parentNode?: Node): void {
    (parentNode || document.body).appendChild(newNode);
  },
  replaceNode(newNode: Node, node: Node, parentNode?: Node): void {
    if (node.parentNode) {
      node.parentNode.replaceChild(newNode, node);
    } else if (shadowPoly !== null) { //HACK: IE template element and shadow dom polyfills not quite right...
      shadowPoly.unwrap(parentNode).replaceChild(
        shadowPoly.unwrap(newNode),
        shadowPoly.unwrap(node)
        );
    } else { //HACK: same as above
      parentNode.replaceChild(newNode, node);
    }
  },
  removeNode(node: Node, parentNode?: Node): void {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    } else if (parentNode) {
      if (shadowPoly !== null) { //HACK: IE template element and shadow dom polyfills not quite right...
        shadowPoly.unwrap(parentNode).removeChild(shadowPoly.unwrap(node));
      } else { //HACK: same as above
        parentNode.removeChild(node);
      }
    }
  },
  injectStyles(styles: string, destination?: Element, prepend?: boolean): Node {
    let node = document.createElement('style');
    node.innerHTML = styles;
    node.type = 'text/css';

    destination = destination || document.head;

    if (prepend && destination.childNodes.length > 0) {
      destination.insertBefore(node, destination.childNodes[0]);
    } else {
      destination.appendChild(node);
    }

    return node;
  }
};

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
