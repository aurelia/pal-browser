export const _FEATURE = {};

_FEATURE.shadowDOM = (function() {
  return !!HTMLElement.prototype.attachShadow;
})();

_FEATURE.scopedCSS = (function() {
  return 'scoped' in document.createElement('style');
})();

_FEATURE.htmlTemplateElement = (function() {
  var d = document.createElement("div");
  d.innerHTML = "<template></template>";
  return 'content' in d.children[0];
})();

_FEATURE.mutationObserver = (function() {
  return !!(window.MutationObserver || window.WebKitMutationObserver);
})();
