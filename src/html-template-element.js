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

  // replaces a #document-fragment .cloneNode
  function __safeCloneNode(deep) {
    const clone = this.standardCloneNode(deep);
    if (deep) {
      if (!this.__templates) {
        // cache child templates on first call
        // fix child templates on first call
        this.__templates = this.querySelectorAll('template');
        let i = this.__templates.length;
        while (i--) {
          installSafeCloneNode(this.__templates.item(i));
        }
      }
      if (this.__templates.length) {
        const clonedTemplates = clone.querySelectorAll('template');
        let i = clonedTemplates.length;
        while (i--) {
          clonedTemplates.item(i).content = this.__templates.item(i).content;
        }
      }
    }
    return clone;
  }

  function installSafeCloneNode(template) {
    if (!template.content.__safeToCloneNode) {
      template.content.standardCloneNode = template.content.cloneNode;
      template.content.cloneNode = __safeCloneNode;
      template.content.__safeToCloneNode = true;
    }
    return template;
  }

  function fixHTMLTemplateElementRoot(template) {
    const content = fixHTMLTemplateElement(template).content;
    const childTemplates = content.querySelectorAll('template');

    for (let i = 0, ii = childTemplates.length; i < ii; ++i) {
      let child = childTemplates[i];

      if (isSVGTemplate(child)) {
        fixSVGTemplateElement(child);
      } else {
        fixHTMLTemplateElement(child);
      }
      // installSafeCloneNode(child);
    }

    installSafeCloneNode(template);

    return template;
  }

  if (!_FEATURE.htmlTemplateElement) {
    _FEATURE.ensureHTMLTemplateElement = fixHTMLTemplateElementRoot;
  }
}
