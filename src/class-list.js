if (typeof FEATURE_NO_IE === 'undefined') {
  /*
   * classList polyfill. Forked from https://github.com/eligrey/classList.js
   *
   * Original impelementation by Eli Grey, http://eligrey.com
   * License: Dedicated to the public domain.
   *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
   */

  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (!('classList' in document.createElement('_')) || document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
    let protoProp = 'prototype';
    let strTrim = String.prototype.trim;
    let arrIndexOf = Array.prototype.indexOf;
    let emptyArray = [];

    let DOMEx = function(type, message) {
      this.name = type;
      this.code = DOMException[type];
      this.message = message;
    };

    let checkTokenAndGetIndex = function(classList, token) {
      if (token === '') {
        throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
      }

      if (/\s/.test(token)) {
        throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
      }

      return arrIndexOf.call(classList, token);
    };

    let ClassList = function(elem) {
      let trimmedClasses = strTrim.call(elem.getAttribute('class') || '');
      let classes = trimmedClasses ? trimmedClasses.split(/\s+/) : emptyArray;

      for (let i = 0, ii = classes.length; i < ii; ++i) {
        this.push(classes[i]);
      }

      this._updateClassName = function() {
        elem.setAttribute('class', this.toString());
      };
    };

    let classListProto = ClassList[protoProp] = [];

    // Most DOMException implementations don't allow calling DOMException's toString()
    // on non-DOMExceptions. Error's toString() is sufficient here.
    DOMEx[protoProp] = Error[protoProp];

    classListProto.item = function(i) {
      return this[i] || null;
    };

    classListProto.contains = function(token) {
      token += '';
      return checkTokenAndGetIndex(this, token) !== -1;
    };

    classListProto.add = function() {
      let tokens = arguments;
      let i = 0;
      let ii = tokens.length;
      let token;
      let updated = false;

      do {
        token = tokens[i] + '';
        if (checkTokenAndGetIndex(this, token) === -1) {
          this.push(token);
          updated = true;
        }
      } while (++i < ii);

      if (updated) {
        this._updateClassName();
      }
    };

    classListProto.remove = function() {
      let tokens = arguments;
      let i = 0;
      let ii = tokens.length;
      let token;
      let updated = false;
      let index;

      do {
        token = tokens[i] + '';
        index = checkTokenAndGetIndex(this, token);
        while (index !== -1) {
          this.splice(index, 1);
          updated = true;
          index = checkTokenAndGetIndex(this, token);
        }
      } while (++i < ii);

      if (updated) {
        this._updateClassName();
      }
    };

    classListProto.toggle = function(token, force) {
      token += '';

      let result = this.contains(token);
      let method = result ? force !== true && 'remove' : force !== false && 'add';

      if (method) {
        this[method](token);
      }

      if (force === true || force === false) {
        return force;
      }

      return !result;
    };

    classListProto.toString = function() {
      return this.join(' ');
    };

    Object.defineProperty(Element.prototype, 'classList', {
      get: function() {
        return new ClassList(this);
      },
      enumerable: true,
      configurable: true
    });
  } else {
    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.
    let testElement = document.createElement('_');
    testElement.classList.add('c1', 'c2');

    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains('c2')) {
      let createMethod = function(method) {
        let original = DOMTokenList.prototype[method];

        DOMTokenList.prototype[method] = function(token) {
          for (let i = 0, ii = arguments.length; i < ii; ++i) {
            token = arguments[i];
            original.call(this, token);
          }
        };
      };

      createMethod('add');
      createMethod('remove');
    }

    testElement.classList.toggle('c3', false);

    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains('c3')) {
      let _toggle = DOMTokenList.prototype.toggle;

      DOMTokenList.prototype.toggle = function(token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        }

        return _toggle.call(this, token);
      };
    }

    testElement = null;
  }
}
