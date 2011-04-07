/*!
  * bonzo.js - copyright @dedfat 2011
  * https://github.com/ded/bonzo
  * Follow our software http://twitter.com/dedfat
  * MIT License
  */
!function (context) {

  function noop() {

  }

  function classReg(c) {
    return new RegExp("(^|\\s+)" + c + "(\\s+|$)");
  }

  function camelize(s) {
    return s.replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase();
    });
  }

  function is(node) {
    return node && node.nodeName && node.nodeType == 3;
  }

  function _bonzo(elements) {
    this.elements = elements;
  }

  function bonzo(els) {
    return new _bonzo(els);
  }

  _bonzo.prototype = {
    each: function (fn) {
      for (var i = 0; i  < this.elements.length; i++) {
        fn(this.elements[i]);
      }
      return this;
    },

    html: function (html) {
      return typeof html == 'string' ?
        this.each(function (el) {
          el.innerHTML = html;
        }) :
        el[0].innerHTML;
    },

    addClass: function (c) {
      return this.each(function (el) {
        this.hasClass(el, c) || (el.className = $.trim(el.className + ' ' + c));
      });
    },

    removeClass: function (c) {
      return this.each(function (el) {
        this.hasClass(el, c) && (el.className = $.trim(el.className.replace(classReg(c), ' ')));
      });
    },

    hasClass: function (el, c) {
      return classReg(c).test(el.className);
    },

    show: function (elements) {
      return this.each(function (el) {
        el.style.display = '';
      });
    },

    hide: function (elements) {
      return this.each(function (el) {
        el.style.display = 'none';
      });
    },

    appendTo: function (node) {
      return this.each(function (el) {
        node.appendChild(el);
      });
    },

    append: function (node) {
      return this.each(function (el) {
        el.appendChild(node);
      });
    },

    after: function (node) {
      return this.each(function (el) {
        node.parentNode.insertBefore(el, node.nextSibling);
      });
    },

    css: function (o, v) {
      var fn = $.isString(o) ?
        function (el) {
          el.style[o] = v;
        } :
        function (el) {
          for (var k in o) {
            o.hasOwnProperty(k) && (el.style[k] = o[k]);
          }
        };
      return this.each(fn);
    },

    offset: function () {
      return this.map(function (el) {
        var width = el.offsetWidth;
        var height = el.offsetHeight;
        var top = el.offsetTop;
        var left = el.offsetLeft;
        while (el = el.offsetParent) {
          top = top + el.offsetTop;
          left = left + el.offsetLeft;
        }
        return {
          top: top,
          left: left,
          height: height,
          width: width
        };
      });
    },

    attr: noop,
    contains: noop,
    clone: noop,
    prepend: noop,
    remove: noop,
    replace: noop,
    swap: noop,
    docHeight: noop,
    winHeight: noop

  };

}(this);