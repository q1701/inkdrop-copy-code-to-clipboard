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

let origPreComponent = null;

export const activate = () => {
  origPreComponent = markdownRenderer.remarkReactComponents.pre;
  markdownRenderer.remarkReactComponents.pre = createCodeBlockWithCopyButton(
    origPreComponent
  );
};

export const deactivate = () => {
  if (origPreComponent) {
    markdownRenderer.remarkReactComponents.pre = origPreComponent;
  } else {
    delete markdownRenderer.remarkReactComponents.pre;
  }
};
