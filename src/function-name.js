if (typeof FEATURE_NO_IE === 'undefined') {
  // Fix Function#name on browsers that do not support it (IE):
  function test() {}

  // Fix: don't shorten to `!test.name` as minifiers may remove the `test` function name,
  // which results in `test.name === ''`, which is falsy.
  if (test.name === undefined) {
    Object.defineProperty(Function.prototype, 'name', {
      get: function() {
        let name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
        // For better performance only parse once, and then cache the
        // result through a new accessor for repeated access.
        Object.defineProperty(this, 'name', { value: name });
        return name;
      }
    });
  }
}
