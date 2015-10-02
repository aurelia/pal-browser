import {initializePAL} from 'aurelia-pal';

export function ensureFunctionName(): void {
  // Fix Function#name on browsers that do not support it (IE):
  function test() {}

  if (!test.name) {
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

export function ensureClassList(): void {
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

export function ensureCustomEvent(): void {
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

export function ensureElementMatches(): void {
  if (Element && !Element.prototype.matches) {
    let proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
      proto.mozMatchesSelector || proto.msMatchesSelector ||
      proto.oMatchesSelector || proto.webkitMatchesSelector;
  }
}

export const FEATURE = {};

FEATURE.shadowDOM = (function() {
  return !!HTMLElement.prototype.createShadowRoot;
})();

FEATURE.htmlTemplateElement = (function() {
  return 'content' in document.createElement('template');
})();

FEATURE.objectObserve = (function detectObjectObserve() {
  if (typeof Object.observe !== 'function') {
    return false;
  }

  let records = [];

  function callback(recs) {
    records = recs;
  }

  let test = {};
  Object.observe(test, callback);
  test.id = 1;
  test.id = 2;
  delete test.id;

  Object.deliverChangeRecords(callback);
  if (records.length !== 3) {
    return false;
  }

  if (records[0].type !== 'add' ||
      records[1].type !== 'update' ||
      records[2].type !== 'delete') {
    return false;
  }

  Object.unobserve(test, callback);

  return true;
})();

FEATURE.arrayObserve = (function detectArrayObserve() {
  if (typeof Array.observe !== 'function') {
    return false;
  }

  let records = [];

  function callback(recs) {
    records = recs;
  }

  let arr = [];
  Array.observe(arr, callback);
  arr.push(1, 2);
  arr.length = 0;

  Object.deliverChangeRecords(callback);
  if (records.length !== 2) {
    return false;
  }

  if (records[0].type !== 'splice' ||
      records[1].type !== 'splice') {
    return false;
  }

  Array.unobserve(arr, callback);

  return true;
})();

export function ensureHTMLTemplateElement(): void {
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

  if (FEATURE.htmlTemplateElement) {
    FEATURE.ensureHTMLTemplateElement = function(template) { return template; };
  } else {
    FEATURE.ensureHTMLTemplateElement = fixHTMLTemplateElementRoot;
  }
}

let shadowPoly = window.ShadowDOMPolyfill || null;

export const DOM = {
  Element: Element,
  boundary: 'aurelia-dom-boundary',
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
      throw new Error(`Template markup must be wrapped in a <template> element e.g. <template> <!-- markup here --> </template>`);
    }

    return FEATURE.ensureHTMLTemplateElement(temp);
  },
  replaceNode(newNode: Node, node: Node, parentNode: Node): void {
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
  removeNode(node: Node, parentNode: Node): void {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    } else if (shadowPoly !== null) { //HACK: IE template element and shadow dom polyfills not quite right...
      shadowPoly.unwrap(parentNode).removeChild(
        shadowPoly.unwrap(node)
        );
    } else { //HACK: same as above
      parentNode.removeChild(node);
    }
  },
  injectStyles(styles: string, destination?: Element, prepend?:boolean): Node {
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

export const PLATFORM = {
  location: window.location,
  history: window.history,
  XMLHttpRequest: XMLHttpRequest
};

export function initialize(): void {
  ensureCustomEvent();
  ensureFunctionName();
  ensureHTMLTemplateElement();
  ensureElementMatches();
  ensureClassList();

  initializePAL(PLATFORM, FEATURE, DOM);
}
