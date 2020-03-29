'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCodeBlockWithCopyButton;

var _react = _interopRequireDefault(require("react"));

var _reactInnertext = _interopRequireDefault(require("react-innertext"));

var _electron = require("electron");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function createCodeBlockWithCopyButton(OrigPre) {
  // 'Copy' button
  const CopyCodeToClipboardButton = props => {
    const handleClick = e => {
      (async () => {
        await _electron.clipboard.writeText(props.text);
      })();
    };

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
      className: "ui button copy-code-to-clipboard-button",
      onClick: handleClick
    }, props.label));
  }; // Code block with a 'Copy' button


  const CodeBlockWithCopyButton = props => {
    // Original node (built-in <pre> or a React Component)
    const OrigNode = props => {
      return OrigPre ? /*#__PURE__*/_react.default.createElement(OrigPre, props, props.children) : /*#__PURE__*/_react.default.createElement("pre", props, props.children);
    }; // Render


    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(OrigNode, _extends({}, props, {
      className: "copy-code-to-clipboard"
    }), /*#__PURE__*/_react.default.createElement(CopyCodeToClipboardButton, {
      label: "Copy",
      text: (0, _reactInnertext.default)(props.children)
    }), props.children));
  }; // Return this component


  return CodeBlockWithCopyButton;
}