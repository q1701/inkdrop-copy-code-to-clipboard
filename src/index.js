'use strict';

import { markdownRenderer } from 'inkdrop';
import createCodeBlockWithCopyButton from './copy-code-to-clipboard';

module.exports = {
  origPreComponent: null,
  activate() {
    this.origPreComponent = markdownRenderer.remarkReactComponents.pre;
    markdownRenderer.remarkReactComponents.pre = createCodeBlockWithCopyButton(
      this.origPreComponent
    );
  },
  deactivate() {
    if (this.origPreComponent) {
      markdownRenderer.remarkReactComponents.pre = this.origPreComponent;
    } else {
      delete markdownRenderer.remarkReactComponents.pre;
    }
  },
};
