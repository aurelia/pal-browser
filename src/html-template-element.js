import {FEATURE} from './feature';

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
    if (child.tagName === 'TEMPLATE') {
      child = fixHTMLTemplateElement(child);
    } else if (isSVGTemplate(child)) {
      child = fixSVGTemplateElement(child);
    }

    content.appendChild(child);
  }

  return template;
}

if (FEATURE.htmlTemplateElement) {
  FEATURE.ensureHTMLTemplateElement = function(template) { return template; };
} else {
  FEATURE.ensureHTMLTemplateElement = fixHTMLTemplateElement;
}
