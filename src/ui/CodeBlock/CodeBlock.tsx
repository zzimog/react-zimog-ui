import {
  type ComponentPropsWithRef,
  type ReactNode,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { codeToHtml } from 'shiki';

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

function getPlaceholderCode(code: string) {
  const html = code
    .replace(/[&<>]/g, (c) => {
      switch (c) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
      }
      return c;
    })
    .split('\n')
    .map((line, i) => {
      return `<span class="line" data-line="${i + 1}">${line}</span>`;
    })
    .join('\n');

  return `<pre><code>${html}</code></pre>`;
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

  const [highlighted, setHighlighted] = useState<string | null>(null);

  const code = getContent(children);
  const placeholder = getPlaceholderCode(code);
  const html = highlighted || placeholder;

  useEffect(() => {
    let isMounted = true;

    async function fetchHtml() {
      const html = await getHighlightedCode(code, language);
      if (isMounted) {
        setHighlighted(html);
      }
    }

    fetchHtml();
    return () => {
      isMounted = false;
    };
  });

  return (
    <figure {...props}>
      {title && (
        <figcaption className="px-4 py-2 border-b border-border font-mono text-sm">
          {title}
        </figcaption>
      )}
      <div
        data-codeblock=""
        className="py-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
};

CodeBlock.displayName = 'CodeBlock';
