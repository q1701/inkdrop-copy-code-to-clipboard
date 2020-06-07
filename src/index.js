import { markdownRenderer } from 'inkdrop';
import createCodeBlockWithCopyButton from './copy-code-to-clipboard';

export const config = {
  buttonLabel: {
    title: 'Button label',
    type: 'string',
    default: 'Copy',
  },
  shouldInsertNewline: {
    title: 'Insert a newline after the last line.',
    type: 'boolean',
    default: false,
  },
};

let origCodeComponent = null;

export const activate = () => {
  origCodeComponent = markdownRenderer.remarkReactComponents.code;
  markdownRenderer.remarkReactComponents.code = createCodeBlockWithCopyButton(
    origCodeComponent
  );
};

export const deactivate = () => {
  if (origCodeComponent) {
    markdownRenderer.remarkReactComponents.code = origCodeComponent;
  } else {
    delete markdownRenderer.remarkReactComponents.code;
  }
};
