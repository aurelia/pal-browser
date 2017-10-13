import {_DOM} from '../src/dom';
import {_FEATURE} from '../src/feature';

describe('dom', () => {
  describe('createTemplateFromMarkup', () => {
    it('should create a template from valid markup', () => {
      expect(() => _DOM.createTemplateFromMarkup('<template>this is valid!</template>')).toBeDefined();
    });

    it('should throw an error when creating a template from text-only markup', () => {
      expect(() => _DOM.createTemplateFromMarkup('throw an error!')).toThrow();
    });

    it('should throw an error when creating a template from markup where <template> is not the root element', () => {
      expect(() => _DOM.createTemplateFromMarkup('<div>throw an error!</div>')).toThrow();
    });

    it('should call ensureTemplateElement', () => {
      spyOn(_FEATURE, 'ensureHTMLTemplateElement').and.callThrough();
      const template = _DOM.createTemplateFromMarkup('<template>this is valid!</template>');
      expect(_FEATURE.ensureHTMLTemplateElement).toHaveBeenCalledWith(template);
    });
  });

  describe('createAttribute', () => {
    it('should create an attribute', () => {
      expect(() => _DOM.createAttribute('aurelia-app')).not.toBeFalsy();
    });
  });

  describe('createTemplateElement', () => {
    it('should call ensureTemplateElement', () => {
      spyOn(_FEATURE, 'ensureHTMLTemplateElement').and.callThrough();
      const template =_DOM.createTemplateElement();
      expect(_FEATURE.ensureHTMLTemplateElement).toHaveBeenCalledWith(template);
    });
  });

  describe('ensureHTMLTemplateElement', () => {
    it('should ensure child templates are properly cloned', () => {
      const template = _DOM.createTemplateFromMarkup(`
        <template>
          <template>child template</template>
          <p>other content</p>
        </template>
      `);
      const clone = template.content.cloneNode(true);
      const clonedChild = clone.querySelectorAll('template')[0];
      expect(clonedChild).toBeDefined();
      expect(clonedChild.content).toBeDefined();
    });

    it('should ensure child templates added post creation are properly cloned', () => {
      const template = _DOM.createTemplateElement();
      const childTemplate = _DOM.createTemplateFromMarkup('<template>child template</template>');
      template.content.appendChild(childTemplate);
      const clone = template.content.cloneNode(true);
      const clonedChild = clone.querySelectorAll('template')[0];
      expect(clonedChild).toBeDefined();
      expect(clonedChild.content).toBeDefined();
    });
  });
});
