import {
  isValidElement,
  type ComponentPropsWithRef,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import { ScrollArea } from '@ui/components';
import { useHighlightedCode } from './use-highlighted-code';

type BaseProps = ComponentPropsWithRef<'figure'>;
type CodeBlockProps = BaseProps & {
  title?: string;
  language?: string;
};

function getNodeText(node?: ReactNode) {
  let string = '';

  if (typeof node === 'string') {
    string = node;
  } else if (typeof node === 'number') {
    string = node.toString();
  } else if (Array.isArray(node)) {
    node.forEach((child) => {
      string += getNodeText(child);
    });
  } else if (isValidElement(node)) {
    const props = node.props as PropsWithChildren;
    string += getNodeText(props.children);
  }

  return string;
}

export const CodeBlock = (inProps: CodeBlockProps) => {
  const { title, language = 'tsx', children = '', ...props } = inProps;

  const textCode = getNodeText(children);
  const html = useHighlightedCode({
    code: textCode,
    lang: language,
  });

  return (
    <figure {...props}>
      {title && (
        <figcaption className="border-b px-4 py-2 font-mono text-sm">
          {title}
        </figcaption>
      )}
      <ScrollArea>
        <pre data-codeblock="" className="min-w-fit py-4">
          <code
            className="flex flex-col"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>
      </ScrollArea>
    </figure>
  );
};

CodeBlock.displayName = 'CodeBlock';
