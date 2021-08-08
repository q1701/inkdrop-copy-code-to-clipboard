"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactInnertext = _interopRequireDefault(require("react-innertext"));

var _electron = require("electron");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const createCodeBlockWithCopyButton = OrigPre => {
  // 'Copy' button
  const CopyCodeToClipboardButton = props => {
    // Properties
    const {
      buttonLabel,
      shouldInsertNewline,
      buttonLabelType,
      text
    } = props; // Event handler

    const handleClick = _ => {
      if (text.length > 0) {
        _electron.clipboard.writeText(shouldInsertNewline ? text : text.replace(/\n$/g, ''));
      } else {
        _electron.clipboard.clear();
      }
    }; // Properties => Visibilities of Button Icon and Text


    const iconVisibility = ['Icon only', 'Both icon and text'].includes(buttonLabelType);
    const textVisibility = ['Text only', 'Both icon and text'].includes(buttonLabelType); // Visibilities => CSS class

    const iconClassNames = [];
    const textClassNames = [];
    if (!iconVisibility && buttonLabel) iconClassNames.push('copy-code-to-clipboard-button-hide-icon');
    if (!textVisibility) textClassNames.push('copy-code-to-clipboard-button-hide-text'); // Return a button

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "ui button copy-code-to-clipboard-button",
      onClick: handleClick
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: iconClassNames.join(' ')
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-clipboard"
    })), /*#__PURE__*/_react.default.createElement("span", {
      className: textClassNames.join(' ')
    }, buttonLabel)));
  }; // Code block with a 'Copy' button


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
    }, []); // Whether or not to insert a newline after the last line.

    const [shouldInsertNewline, setShouldInsertNewline] = (0, _react.useState)(inkdrop.config.get('copy-code-to-clipboard.shouldInsertNewline'));
    (0, _react.useEffect)(() => {
      const disposable = inkdrop.config.onDidChange('copy-code-to-clipboard.shouldInsertNewline', ({
        newValue
      }) => setShouldInsertNewline(newValue));
      return () => disposable.dispose();
    }, []); // How the button label displayed.

    const [buttonLabelType, setButtonLabelType] = (0, _react.useState)(inkdrop.config.get('copy-code-to-clipboard.buttonLabelType'));
    (0, _react.useEffect)(() => {
      const disposable = inkdrop.config.onDidChange('copy-code-to-clipboard.buttonLabelType', ({
        newValue
      }) => setButtonLabelType(newValue));
      return () => disposable.dispose();
    }, []); // Original node (built-in <pre> or a React Component)

    const OrigNode = ({
      children,
      ...props
    }) => {
      return OrigPre ? /*#__PURE__*/_react.default.createElement(OrigPre, props, children) : /*#__PURE__*/_react.default.createElement("pre", props, children);
    }; // Render


    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(OrigNode, props, children), /*#__PURE__*/_react.default.createElement("div", {
      className: "copy-code-to-clipboard"
    }, /*#__PURE__*/_react.default.createElement(CopyCodeToClipboardButton, {
      buttonLabel,
      shouldInsertNewline,
      buttonLabelType,
      text: (0, _reactInnertext.default)(children)
    })));
  }; // Return this component


  return CodeBlockWithCopyButton;
};

var _default = createCodeBlockWithCopyButton;
exports.default = _default;