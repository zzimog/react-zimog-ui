import { toHtml } from 'hast-util-to-html';
import type { ComponentPropsWithRef } from 'react';
import { refractor } from 'refractor/core';
import jsx from 'refractor/jsx';
import './codeblock-theme.css';

type CodeProps = Omit<ComponentPropsWithRef<'pre'>, 'children'> & {
  children?: string;
};

function getHtml(text: string) {
  refractor.register(jsx);
  return toHtml(refractor.highlight(text, 'jsx'));
}

export const Code = (inProps: CodeProps) => {
  const { children = '', ...props } = inProps;

  const html = getHtml(children);

  return (
    <pre className="CodeBlock" {...props}>
      <code
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ all: 'unset', display: 'contents' }}
      />
    </pre>
  );
};
