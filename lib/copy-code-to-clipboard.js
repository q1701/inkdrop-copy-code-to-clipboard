"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRelativeContainer = exports.createCodeBlockWithCopyButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactInnertext = _interopRequireDefault(require("react-innertext"));
var _electron = require("electron");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const createRelativeContainer = OrigPre => {
  const RelativeContainer = ({
    children,
    ...props
  }) => {
    const OrigNode = ({
      children,
      ...props
    }) => {
      return OrigPre ? /*#__PURE__*/_react.default.createElement(OrigPre, props, children) : /*#__PURE__*/_react.default.createElement("pre", props, children);
    };
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "copy-code-to-clipboard-block-container"
    }, /*#__PURE__*/_react.default.createElement(OrigNode, props, children)));
  };
  return RelativeContainer;
};
exports.createRelativeContainer = createRelativeContainer;
const createCodeBlockWithCopyButton = OrigCode => {
  // 'Copy' button
  const CopyCodeToClipboardButton = props => {
    // Properties
    const {
      buttonLabel,
      shouldInsertNewline,
      buttonLabelType,
      text
    } = props;
    // Event handler
    const handleClick = _ => {
      if (text.length > 0) {
        _electron.clipboard.writeText(shouldInsertNewline ? text : text.replace(/\n$/g, ''));
      } else {
        _electron.clipboard.clear();
      }
    };
    // Properties => Visibilities of Button Icon and Text
    const iconVisibility = ['Icon only', 'Both icon and text'].includes(buttonLabelType);
    const textVisibility = ['Text only', 'Both icon and text'].includes(buttonLabelType);
    // Visibilities => CSS class
    const iconClassNames = [];
    const textClassNames = [];
    if (!iconVisibility && buttonLabel) iconClassNames.push('copy-code-to-clipboard-button-hide-icon');
    if (!textVisibility) textClassNames.push('copy-code-to-clipboard-button-hide-text');
    // Return a button
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "ui button copy-code-to-clipboard-button",
      onClick: handleClick
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: iconClassNames.join(' ')
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "icon clipboard outline"
    })), /*#__PURE__*/_react.default.createElement("span", {
      className: textClassNames.join(' ')
    }, buttonLabel)));
  };
  // Code block with a 'Copy' button
  const CodeBlockWithCopyButton = ({
    children,
    ...props
  }) => {
    // Button label
    const [buttonLabel, setButtonLabel] = (0, _react.useState)(inkdrop.config.get('copy-code-to-clipboard.buttonLabel'));
    (0, _react.useEffect)(() => {
      const disposable = inkdrop.config.onDidChange('copy-code-to-clipboard.buttonLabel', ({
        newValue
      }) => setButtonLabel(newValue));
      return () => disposable.dispose();
    }, []);
    // Whether or not to insert a newline after the last line.
    const [shouldInsertNewline, setShouldInsertNewline] = (0, _react.useState)(inkdrop.config.get('copy-code-to-clipboard.shouldInsertNewline'));
    (0, _react.useEffect)(() => {
      const disposable = inkdrop.config.onDidChange('copy-code-to-clipboard.shouldInsertNewline', ({
        newValue
      }) => setShouldInsertNewline(newValue));
      return () => disposable.dispose();
    }, []);
    // How the button label displayed.
    const [buttonLabelType, setButtonLabelType] = (0, _react.useState)(inkdrop.config.get('copy-code-to-clipboard.buttonLabelType'));
    (0, _react.useEffect)(() => {
      const disposable = inkdrop.config.onDidChange('copy-code-to-clipboard.buttonLabelType', ({
        newValue
      }) => setButtonLabelType(newValue));
      return () => disposable.dispose();
    }, []);
    // Enable copy button in inline code.
    const [enableInlineCodeCopy, setEnableInlineCodeCopy] = (0, _react.useState)(inkdrop.config.get('copy-code-to-clipboard.enableInlineCodeCopy'));
    (0, _react.useEffect)(() => {
      const disposable = inkdrop.config.onDidChange('copy-code-to-clipboard.enableInlineCodeCopy', ({
        newValue
      }) => setEnableInlineCodeCopy(newValue));
      return () => disposable.dispose();
    }, []);
    // Original node (built-in <code> or a React Component)
    const OrigNode = ({
      children,
      ...props
    }) => {
      return OrigCode ? /*#__PURE__*/_react.default.createElement(OrigCode, props, children) : /*#__PURE__*/_react.default.createElement("code", props, children);
    };
    // Render
    const inlineContainerClassName = enableInlineCodeCopy ? 'copy-code-to-clipboard-inline-container' : null;
    return /*#__PURE__*/_react.default.createElement("span", {
      className: inlineContainerClassName
    }, /*#__PURE__*/_react.default.createElement(OrigNode, props, children), /*#__PURE__*/_react.default.createElement(CopyCodeToClipboardButton, {
      buttonLabel,
      shouldInsertNewline,
      buttonLabelType,
      text: (0, _reactInnertext.default)(children)
    }));
  };
  // Return this component
  return CodeBlockWithCopyButton;
};
exports.createCodeBlockWithCopyButton = createCodeBlockWithCopyButton;