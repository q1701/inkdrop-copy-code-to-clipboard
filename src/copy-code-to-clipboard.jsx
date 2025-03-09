import { useState, useEffect } from 'react';
import innerText from 'react-innertext';
import { clipboard } from 'electron';

const createRelativeContainer = (OrigPre) => {
  const RelativeContainer = ({ children, ...props }) => {
    const OrigNode = ({ children, ...props }) => {
      return OrigPre ? (
        <OrigPre {...props}>{children}</OrigPre>
      ) : (
        <pre {...props}>{children}</pre>
      );
    };
    return (
      <>
        <div className="copy-code-to-clipboard-block-container">
          <OrigNode {...props}>{children}</OrigNode>
        </div>
      </>
    );
  };
  return RelativeContainer;
};

const createCodeBlockWithCopyButton = (OrigCode) => {
  // 'Copy' button
  const CopyCodeToClipboardButton = (props) => {
    // Properties
    const { buttonLabel, shouldInsertNewline, buttonLabelType, text } = props;
    // Event handler
    const handleClick = (_) => {
      if (text.length > 0) {
        clipboard.writeText(
          shouldInsertNewline ? text : text.replace(/\n$/g, ''),
        );
      } else {
        clipboard.clear();
      }
    };
    // Properties => Visibilities of Button Icon and Text
    const iconVisibility = ['Icon only', 'Both icon and text'].includes(
      buttonLabelType,
    );
    const textVisibility = ['Text only', 'Both icon and text'].includes(
      buttonLabelType,
    );
    // Visibilities => CSS class
    const iconClassNames = [];
    const textClassNames = [];
    if (!iconVisibility && buttonLabel)
      iconClassNames.push('copy-code-to-clipboard-button-hide-icon');
    if (!textVisibility)
      textClassNames.push('copy-code-to-clipboard-button-hide-text');
    // Return a button
    return (
      <>
        <button
          type="button"
          className="ui button copy-code-to-clipboard-button"
          onClick={handleClick}
        >
          <span className={iconClassNames.join(' ')}>
            <i className="icon clipboard outline" />
          </span>
          <span className={textClassNames.join(' ')}>{buttonLabel}</span>
        </button>
      </>
    );
  };
  // Code block with a 'Copy' button
  const CodeBlockWithCopyButton = ({ children, ...props }) => {
    // Button label
    const [buttonLabel, setButtonLabel] = useState(
      inkdrop.config.get('copy-code-to-clipboard.buttonLabel'),
    );
    useEffect(() => {
      const disposable = inkdrop.config.onDidChange(
        'copy-code-to-clipboard.buttonLabel',
        ({ newValue }) => setButtonLabel(newValue),
      );
      return () => disposable.dispose();
    }, []);
    // Whether or not to insert a newline after the last line.
    const [shouldInsertNewline, setShouldInsertNewline] = useState(
      inkdrop.config.get('copy-code-to-clipboard.shouldInsertNewline'),
    );
    useEffect(() => {
      const disposable = inkdrop.config.onDidChange(
        'copy-code-to-clipboard.shouldInsertNewline',
        ({ newValue }) => setShouldInsertNewline(newValue),
      );
      return () => disposable.dispose();
    }, []);
    // How the button label displayed.
    const [buttonLabelType, setButtonLabelType] = useState(
      inkdrop.config.get('copy-code-to-clipboard.buttonLabelType'),
    );
    useEffect(() => {
      const disposable = inkdrop.config.onDidChange(
        'copy-code-to-clipboard.buttonLabelType',
        ({ newValue }) => setButtonLabelType(newValue),
      );
      return () => disposable.dispose();
    }, []);
    // Enable copy button in inline code.
    const [enableInlineCodeCopy, setEnableInlineCodeCopy] = useState(
      inkdrop.config.get('copy-code-to-clipboard.enableInlineCodeCopy'),
    );
    useEffect(() => {
      const disposable = inkdrop.config.onDidChange(
        'copy-code-to-clipboard.enableInlineCodeCopy',
        ({ newValue }) => setEnableInlineCodeCopy(newValue),
      );
      return () => disposable.dispose();
    }, []);
    // Original node (built-in <code> or a React Component)
    const OrigNode = ({ children, ...props }) => {
      return OrigCode ? (
        <OrigCode {...props}>{children}</OrigCode>
      ) : (
        <code {...props}>{children}</code>
      );
    };
    // Render
    const inlineContainerClassName = enableInlineCodeCopy
      ? 'copy-code-to-clipboard-inline-container'
      : null;
    return (
      <span className={inlineContainerClassName}>
        <OrigNode {...props}>{children}</OrigNode>
        <CopyCodeToClipboardButton
          {...{
            buttonLabel,
            shouldInsertNewline,
            buttonLabelType,
            text: innerText(children),
          }}
        />
      </span>
    );
  };
  // Return this component
  return CodeBlockWithCopyButton;
};

export { createRelativeContainer, createCodeBlockWithCopyButton };
