export const _FEATURE = {};

_FEATURE.shadowDOM = (function() {
  return !!HTMLElement.prototype.attachShadow;
})();

_FEATURE.scopedCSS = (function() {
  return 'scoped' in document.createElement('style');
})();

_FEATURE.htmlTemplateElement = (function() {
  return 'content' in document.createElement('template');
})();

_FEATURE.mutationObserver = (function() {
  return !!(window.MutationObserver || window.WebKitMutationObserver);
})();
