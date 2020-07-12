import React, { useState, useEffect } from 'react';
import innerText from 'react-innertext';
import { clipboard } from 'electron';

const createCodeBlockWithCopyButton = (OrigPre) => {
  // 'Copy' button
  const CopyCodeToClipboardButton = (props) => {
    const { _buttonLabel, shouldInsertNewline, text } = props;
    const handleClick = (_) => {
      clipboard.writeText(
        shouldInsertNewline ? text : text.replace(/\n$/g, '')
      );
    };
    return (
      <>
        <button
          type="button"
          className="ui button copy-code-to-clipboard-button"
          onClick={handleClick}
        >
          <i className="fa fa-clipboard" />
        </button>
      </>
    );
  };
  // Code block with a 'Copy' button
  const CodeBlockWithCopyButton = ({ children, ...props }) => {
    // Button label
    const [buttonLabel, setButtonLabel] = useState(
      inkdrop.config.get('copy-code-to-clipboard.buttonLabel')
    );
    useEffect(() => {
      const disposable = inkdrop.config.onDidChange(
        'copy-code-to-clipboard.buttonLabel',
        ({ newValue }) => setButtonLabel(newValue)
      );
      return () => disposable.dispose();
    }, []);
    // Whether or not to insert a newline after the last line.
    const [shouldInsertNewline, setShouldInsertNewline] = useState(
      inkdrop.config.get('copy-code-to-clipboard.shouldInsertNewline')
    );
    useEffect(() => {
      const disposable = inkdrop.config.onDidChange(
        'copy-code-to-clipboard.shouldInsertNewline',
        ({ newValue }) => setShouldInsertNewline(newValue)
      );
      return () => disposable.dispose();
    }, []);
    // Original node (built-in <pre> or a React Component)
    const OrigNode = ({ children, ...props }) => {
      return OrigPre ? (
        <OrigPre {...props}>{children}</OrigPre>
      ) : (
        <pre {...props}>{children}</pre>
      );
    };
    // Render
    return (
      <>
        <div className="copy-code-to-clipboard">
          <OrigNode {...props}>{children}</OrigNode>
          <CopyCodeToClipboardButton
            {...{ buttonLabel, shouldInsertNewline, text: innerText(children) }}
          />
        </div>
      </>
    );
  };
  // Return this component
  return CodeBlockWithCopyButton;
};

export default createCodeBlockWithCopyButton;
