/*global require, module, window, document */

'use strict';
var Emitter = require('tiny-emitter');
var emitter = new Emitter();

if (window && window.getComputedStyle && window.addEventListener) {
  var cssDeclaration = null,
    last = null;

  var getCurrentBreakpoint = function () {
    if (!cssDeclaration) {
      cssDeclaration = window.getComputedStyle(document.body, ':after');
    }

    return cssDeclaration.getPropertyValue('content').replace(/'|"/g, '');
  };

  var publishChange = function (breakpoint) {
    emitter.emit(breakpoint).emit('change', breakpoint);
  };

  var checkBreakpoint = function () {
    var current = getCurrentBreakpoint();

    if (current !== last) {
      publishChange(current);
      last = current;
    }
  };

  window.addEventListener('load', checkBreakpoint);
  window.addEventListener('resize', checkBreakpoint);
}

module.exports = emitter;
