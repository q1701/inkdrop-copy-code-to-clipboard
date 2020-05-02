"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivate = exports.activate = exports.config = void 0;

var _inkdrop = require("inkdrop");

var _copyCodeToClipboard = _interopRequireDefault(require("./copy-code-to-clipboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = {
  buttonLabel: {
    title: 'Button label',
    type: 'string',
    default: 'Copy'
  },
  shouldInsertNewline: {
    title: 'Insert a newline after the last line.',
    type: 'boolean',
    default: false
  }
};
exports.config = config;
let origPreComponent = null;

const activate = () => {
  origPreComponent = _inkdrop.markdownRenderer.remarkReactComponents.pre;
  _inkdrop.markdownRenderer.remarkReactComponents.pre = (0, _copyCodeToClipboard.default)(origPreComponent);
};

exports.activate = activate;

const deactivate = () => {
  if (origPreComponent) {
    _inkdrop.markdownRenderer.remarkReactComponents.pre = origPreComponent;
  } else {
    delete _inkdrop.markdownRenderer.remarkReactComponents.pre;
  }
};

exports.deactivate = deactivate;