import {_FEATURE} from './feature';

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
