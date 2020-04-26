import React from 'react';
import innerText from 'react-innertext';
import { clipboard } from 'electron';

export default function createCodeBlockWithCopyButton(OrigPre) {
  // 'Copy' button
  const CopyCodeToClipboardButton = (props) => {
    const handleClick = (_) => {
      clipboard.writeText(props.text.replace(/\n$/g, ''));
    };
    const { label } = props;
    return (
      <>
        <button
          type="button"
          className="ui button copy-code-to-clipboard-button"
          onClick={handleClick}
        >
          {label}
        </button>
      </>
    );
  };
  // Code block with a 'Copy' button
  const CodeBlockWithCopyButton = (props) => {
    // Original node (built-in <pre> or a React Component)
    const OrigNode = (props) => {
      const { children } = props;
      return OrigPre ? (
        <OrigPre {...props}>{children}</OrigPre>
      ) : (
        <pre {...props}>{children}</pre>
      );
    };
    // Render
    const { children } = props;
    return (
      <>
        <OrigNode {...props} className="copy-code-to-clipboard">
          <CopyCodeToClipboardButton label="Copy" text={innerText(children)} />
          {children}
        </OrigNode>
      </>
    );
  };
  // Return this component
  return CodeBlockWithCopyButton;
}
