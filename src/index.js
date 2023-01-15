import { markdownRenderer } from 'inkdrop';
import {
  createRelativeContainer,
  createCodeBlockWithCopyButton,
} from './copy-code-to-clipboard';

export const config = {
  buttonLabel: {
    title: 'Button label',
    type: 'string',
    default: 'Copy',
  },
  shouldInsertNewline: {
    title: 'Insert a newline after the last line.',
    description: 'Whether or not to insert a newline after the last line.',
    type: 'boolean',
    default: false,
  },
  buttonLabelType: {
    title: 'Button label type',
    description: 'How the button label displayed.',
    type: 'string',
    default: 'Icon only',
    enum: ['Icon only', 'Text only', 'Both icon and text'],
  },
  enableInlineCodeCopy: {
    title: 'Enable copy button in inline code.',
    description:
      'Whether or not to show a copy button in the inline code block.',
    type: 'boolean',
    default: true,
  },
};

let origPreComponent = null;
let origCodeComponent = null;

export const activate = () => {
  origPreComponent = markdownRenderer.remarkReactComponents.pre;
  markdownRenderer.remarkReactComponents.pre =
    createRelativeContainer(origPreComponent);
  origCodeComponent = markdownRenderer.remarkReactComponents.code;
  markdownRenderer.remarkReactComponents.code =
    createCodeBlockWithCopyButton(origCodeComponent);
};

export const deactivate = () => {
  if (origPreComponent) {
    markdownRenderer.remarkReactComponents.pre = origPreComponent;
  } else {
    delete markdownRenderer.remarkReactComponents.pre;
  }
  if (origCodeComponent) {
    markdownRenderer.remarkReactComponents.code = origCodeComponent;
  } else {
    delete markdownRenderer.remarkReactComponents.code;
  }
};
