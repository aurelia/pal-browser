import { _FEATURE } from './feature';

let shadowPoly = window.ShadowDOMPolyfill || null;

/**
* Represents the core APIs of the DOM.
*/
export const _DOM = {
  Element: Element,
  NodeList: NodeList,
  SVGElement: SVGElement,
  boundary: 'aurelia-dom-boundary',
  addEventListener(eventName: string, callback: EventListenerOrEventListenerObject, capture?: boolean): void {
    document.addEventListener(eventName, callback, capture);
  },
  removeEventListener(eventName: string, callback: EventListenerOrEventListenerObject, capture?: boolean): void {
    document.removeEventListener(eventName, callback, capture);
  },
  adoptNode(node: Node) {
    return document.adoptNode(node);
  },
  createAttribute(name: string): Attr {
    return document.createAttribute(name);
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
  createTemplateElement(): HTMLTemplateElement {
    let template = document.createElement('template');
    return _FEATURE.ensureHTMLTemplateElement(template);
  },
  createMutationObserver(callback: Function): MutationObserver {
    return new (window.MutationObserver || window.WebKitMutationObserver)(callback);
  },
  createCustomEvent<T = any>(eventType: string, options?: CustomEventInit<T>): CustomEvent<T> {
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
  querySelector(query: string) {
    return document.querySelector(query);
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
  createTemplateFromMarkup(markup: string): HTMLTemplateElement {
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
  injectStyles(styles: string, destination?: Element, prepend?: boolean, id?: string): Node {
    if (id) {
      let oldStyle = document.getElementById(id);
      if (oldStyle) {
        let isStyleTag = oldStyle.tagName.toLowerCase() === 'style';

        if (isStyleTag) {
          oldStyle.innerHTML = styles;
          return;
        }

        throw new Error('The provided id does not indicate a style tag.');
      }
    }

    let node = document.createElement('style');
    node.innerHTML = styles;
    node.type = 'text/css';

    if (id) {
      node.id = id;
    }

    destination = destination || document.head;

    if (prepend && destination.childNodes.length > 0) {
      destination.insertBefore(node, destination.childNodes[0]);
    } else {
      destination.appendChild(node);
    }

    return node;
  }
};
