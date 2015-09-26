export const PLATFORM = {
  location: window.location,
  history: window.history,
  XMLHttpRequest: XMLHttpRequest,
  eachModule: function() {}
};

PLATFORM.global = (function() {
  // Workers don’t have `window`, only `self`
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  // Not all environments allow eval and Function
  // Use only as a last resort:
  return new Function('return this')();
})();
