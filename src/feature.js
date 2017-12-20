export const _FEATURE = {
  shadowDOM: !!HTMLElement.prototype.attachShadow,
  scopedCSS: 'scoped' in document.createElement('style'),
  htmlTemplateElement: (function() {
    let d = document.createElement('div');
    d.innerHTML = '<template></template>';
    return 'content' in d.children[0];
  })(),
  mutationObserver: !!(window.MutationObserver || window.WebKitMutationObserver),
  ensureHTMLTemplateElement: t => t
};
