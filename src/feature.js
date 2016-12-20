export const _FEATURE = {};

_FEATURE.shadowDOM = (function() {
  return typeof HTMLElement !== 'undefined' && !!HTMLElement.prototype.attachShadow;
})();

_FEATURE.scopedCSS = (function() {
  return typeof document !== 'undefined' && 'scoped' in document.createElement('style');
})();

_FEATURE.htmlTemplateElement = (function() {
  return typeof document !== 'undefined' && 'content' in document.createElement('template');
})();

_FEATURE.mutationObserver = (function() {
  return typeof window !== 'undefined' && !!(window.MutationObserver || window.WebKitMutationObserver);
})();
