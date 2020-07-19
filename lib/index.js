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
let origCodeComponent = null;

const activate = () => {
  origCodeComponent = _inkdrop.markdownRenderer.remarkReactComponents.code;
  _inkdrop.markdownRenderer.remarkReactComponents.code = (0, _copyCodeToClipboard.default)(origCodeComponent);
};

exports.activate = activate;

const deactivate = () => {
  if (origCodeComponent) {
    _inkdrop.markdownRenderer.remarkReactComponents.code = origCodeComponent;
  } else {
    delete _inkdrop.markdownRenderer.remarkReactComponents.code;
  }
};

exports.deactivate = deactivate;