"use strict";

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
    const handleClick = _ => {
      _electron.clipboard.writeText(props.text.replace(/\n$/g, ''));
    };

    const {
      label
    } = props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "ui button copy-code-to-clipboard-button",
      onClick: handleClick
    }, label));
  }; // Code block with a 'Copy' button


  const CodeBlockWithCopyButton = props => {
    // Original node (built-in <pre> or a React Component)
    const OrigNode = props => {
      const {
        children
      } = props;
      return OrigPre ? /*#__PURE__*/_react.default.createElement(OrigPre, props, children) : /*#__PURE__*/_react.default.createElement("pre", props, children);
    }; // Render


    const {
      children
    } = props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(OrigNode, _extends({}, props, {
      className: "copy-code-to-clipboard"
    }), /*#__PURE__*/_react.default.createElement(CopyCodeToClipboardButton, {
      label: "Copy",
      text: (0, _reactInnertext.default)(children)
    }), children));
  }; // Return this component


  return CodeBlockWithCopyButton;
}