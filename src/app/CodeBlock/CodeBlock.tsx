import {
  type ComponentPropsWithRef,
  type ReactNode,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { codeToHtml } from 'shiki';
import './codeblock.css';
import { cn } from '@ui';

type CodeBlockProps = ComponentPropsWithRef<'figure'> & {
  title?: string;
  language?: string;
};

function getContent(node: ReactNode) {
  let string = '';

  if (typeof node === 'string') {
    string = node;
  } else if (typeof node === 'number') {
    string = node.toString();
  } else if (Array.isArray(node)) {
    node.forEach((child) => {
      string += getContent(child);
    });
  } else if (isValidElement(node)) {
    string += getContent((node as any).props.children);
  }

  return string;
}

function getEscapedCode(code: string) {
  const chars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };

  return code.replace(/[&<>]/g, (c) => {
    return (chars as any)[c] || c;
  });
}

async function getHighlightedCode(code: string, lang: string) {
  const html = await codeToHtml(code, {
    lang,
    rootStyle: false,
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
    transformers: [
      {
        pre(node) {
          node.properties['class'] = 'py-4';
        },
        code(node) {
          node.properties['style'] = 'all: unset; display: contents;';
        },
        line(node, line) {
          node.properties['data-line'] = line;

          /**
           * @todo Implement line highlight
           *
           * if ([1, 3, 4].includes(line)) {
           *   this.addClassToHast(node, 'highlight');
           * }
           */
        },
      },
    ],
  });

  return html;
}

export const CodeBlock = (inProps: CodeBlockProps) => {
  const { title, language = 'tsx', children = '', ...props } = inProps;

  const code = getContent(children);
  const placeholder = getEscapedCode(code);
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchHtml() {
      const html = await getHighlightedCode(code, language);
      if (isMounted) {
        setHtml(html);
      }
    }

    fetchHtml();
    return () => {
      isMounted = false;
    };
  });

  return (
    <figure
      {...props}
      className={cn(
        '**:transition-colors',
        '**:dark:text-(--shiki-dark)!',
        props.className
      )}
    >
      {title && (
        <figcaption className="px-4 py-2 border-b border-border font-mono text-sm">
          {title}
        </figcaption>
      )}
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="py-4 pl-16">
          <code dangerouslySetInnerHTML={{ __html: placeholder }} />
        </pre>
      )}
    </figure>
  );
};

CodeBlock.displayName = 'CodeBlock';
