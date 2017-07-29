import {_DOM} from '../src/dom';

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
  });

  describe('createAttribute', () => {
    it('should create an attribute', () => {
      expect(() => _DOM.createAttribute('aurelia-app')).not.toBeFalsy();
    });
  });
});
