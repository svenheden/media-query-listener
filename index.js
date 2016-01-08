/*global require, module, window, document */

'use strict';

if (!(window && window.getComputedStyle && window.addEventListener)) {
  return;
}

var Emitter = require('tiny-emitter');
var emitter = new Emitter();
var cssDeclaration = window.getComputedStyle(document.body, ':after');
var last;

function getCurrentBreakpoint() {
  return cssDeclaration.getPropertyValue('content').replace(/'|"/g, '');
}

function publishChange(breakpoint) {
  emitter.emit(breakpoint).emit('change', breakpoint);
}

function checkBreakpoint() {
  var current = getCurrentBreakpoint();

  if (current !== last) {
    publishChange(current);
    last = current;
  }
};

window.addEventListener('load', checkBreakpoint);
window.addEventListener('resize', checkBreakpoint);

module.exports = emitter;
