"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivate = exports.config = exports.activate = void 0;
var _inkdrop = require("inkdrop");
var _copyCodeToClipboard = require("./copy-code-to-clipboard");
const config = {
  buttonLabel: {
    title: 'Button label',
    type: 'string',
    default: 'Copy'
  },
  shouldInsertNewline: {
    title: 'Insert a newline after the last line.',
    description: 'Whether or not to insert a newline after the last line.',
    type: 'boolean',
    default: false
  },
  buttonLabelType: {
    title: 'Button label type',
    description: 'How the button label displayed.',
    type: 'string',
    default: 'Icon only',
    enum: ['Icon only', 'Text only', 'Both icon and text']
  }
};
exports.config = config;
let origPreComponent = null;
let origCodeComponent = null;
const activate = () => {
  origPreComponent = _inkdrop.markdownRenderer.remarkReactComponents.pre;
  _inkdrop.markdownRenderer.remarkReactComponents.pre = (0, _copyCodeToClipboard.createRelativeContainer)(origPreComponent);
  origCodeComponent = _inkdrop.markdownRenderer.remarkReactComponents.code;
  _inkdrop.markdownRenderer.remarkReactComponents.code = (0, _copyCodeToClipboard.createCodeBlockWithCopyButton)(origCodeComponent);
};
exports.activate = activate;
const deactivate = () => {
  if (origPreComponent) {
    _inkdrop.markdownRenderer.remarkReactComponents.pre = origPreComponent;
  } else {
    delete _inkdrop.markdownRenderer.remarkReactComponents.pre;
  }
  if (origCodeComponent) {
    _inkdrop.markdownRenderer.remarkReactComponents.code = origCodeComponent;
  } else {
    delete _inkdrop.markdownRenderer.remarkReactComponents.code;
  }
};
exports.deactivate = deactivate;