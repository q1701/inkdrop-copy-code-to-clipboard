'use strict';

import React from 'react';
import innerText from 'react-innertext';
import { clipboard } from 'electron';

export default function createCodeBlockWithCopyButton(OrigPre) {
  // 'Copy' button
  const CopyCodeToClipboardButton = props => {
    const handleClick = e => {
      (async () => {
        await clipboard.writeText(props.text);
      })();
    };
    return (
      <>
        <button
          className="ui button copy-code-to-clipboard-button"
          onClick={handleClick}
        >
          {props.label}
        </button>
      </>
    );
  };
  // Code block with a 'Copy' button
  const CodeBlockWithCopyButton = props => {
    // Original node (built-in <pre> or a React Component)
    const OrigNode = props => {
      return OrigPre ? (
        <OrigPre {...props}>{props.children}</OrigPre>
      ) : (
        <pre {...props}>{props.children}</pre>
      );
    };
    // Render
    return (
      <>
        <OrigNode {...props} className="copy-code-to-clipboard">
          <CopyCodeToClipboardButton
            label="Copy"
            text={innerText(props.children)}
          />
          {props.children}
        </OrigNode>
      </>
    );
  };
  // Return this component
  return CodeBlockWithCopyButton;
}
