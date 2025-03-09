"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRelativeContainer = exports.createCodeBlockWithCopyButton = void 0;
var _react = require("react");
var _reactInnertext = _interopRequireDefault(require("react-innertext"));
var _electron = require("electron");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createRelativeContainer = OrigPre => {
  const RelativeContainer = ({
    children,
    ...props
  }) => {
    const OrigNode = ({
      children,
      ...props
    }) => {
      return OrigPre ? /*#__PURE__*/React.createElement(OrigPre, props, children) : /*#__PURE__*/React.createElement("pre", props, children);
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "copy-code-to-clipboard-block-container"
    }, /*#__PURE__*/React.createElement(OrigNode, props, children)));
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "ui button copy-code-to-clipboard-button",
      onClick: handleClick
    }, /*#__PURE__*/React.createElement("span", {
      className: iconClassNames.join(' ')
    }, /*#__PURE__*/React.createElement("i", {
      className: "icon clipboard outline"
    })), /*#__PURE__*/React.createElement("span", {
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
      return OrigCode ? /*#__PURE__*/React.createElement(OrigCode, props, children) : /*#__PURE__*/React.createElement("code", props, children);
    };
    // Render
    const inlineContainerClassName = enableInlineCodeCopy ? 'copy-code-to-clipboard-inline-container' : null;
    return /*#__PURE__*/React.createElement("span", {
      className: inlineContainerClassName
    }, /*#__PURE__*/React.createElement(OrigNode, props, children), /*#__PURE__*/React.createElement(CopyCodeToClipboardButton, {
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