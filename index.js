/*global require, module, window, document */

'use strict';

if (!(window && window.getComputedStyle && window.addEventListener)) {
  return;
}

var Emitter = require('tiny-emitter');
var emitter = new Emitter();
var cssDeclaration = window.getComputedStyle(document.body, ':after');
var lastBreakpoint;

var checkBreakpoint = function() {
  var currentBreakpoint = cssDeclaration
    .getPropertyValue('content')
    .replace(/'|"/g, '');

  if (currentBreakpoint !== lastBreakpoint) {
    emitter
      .emit(currentBreakpoint)
      .emit('change', currentBreakpoint);

    lastBreakpoint = currentBreakpoint;
  }
};

window.addEventListener('load', checkBreakpoint);
window.addEventListener('resize', checkBreakpoint);

module.exports = emitter;
