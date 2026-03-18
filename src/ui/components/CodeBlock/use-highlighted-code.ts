import { useEffect, useState } from 'react';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

const Shiki = await createHighlighterCore({
  engine: createOnigurumaEngine(import('shiki/wasm')),
  langs: [import('@shikijs/langs/tsx'), import('@shikijs/langs/bash')],
  themes: [
    import('@shikijs/themes/github-dark'),
    import('@shikijs/themes/github-light'),
  ],
});

function formatLines(code: string) {
  const lines = code.split('\n');
  if (!lines.length) {
    return [];
  }

  while (lines[0]?.trim() === '') lines.shift();
  while (lines[lines.length - 1]?.trim() === '') lines.pop();

  const indentMatch = lines[0]?.match(/^\s*/);
  const indent = indentMatch ? indentMatch[0].length : 0;

  return lines.map((line) => line.slice(indent));
}

function getPlaceholderHtml(code: string) {
  return formatLines(code)
    .map((line, i) => {
      const escaped = line
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('<', '&gt;');

      return `<span data-line="${i + 1}">${escaped}</span>`;
    })
    .join('\n');
}

/**
 * @todo Implement line highlight
 *
 * if ([1, 3, 4].includes(line)) {
 *   this.addClassToHast(node, 'highlight');
 * }
 */
async function getHighlightedCode(code: string, lang: string) {
  return Shiki.codeToHtml(code, {
    lang,
    rootStyle: false,
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
    transformers: [
      {
        line(node, line) {
          node.properties['data-line'] = line;
          node.properties['class'] = undefined;
        },
        span(hast, _line, _col, _lineElement, token) {
          const color = token.htmlStyle?.color;
          const dark = token.htmlStyle?.['--shiki-dark'];
          if (color && dark) {
            hast.properties['style'] = `--color:${color};--color-dark:${dark}`;
          }
        },
        postprocess(html) {
          return html
            .replace(/<pre[^>]*>|<\/pre>/g, '')
            .replace(/<code[^>]*>|<\/code>/g, '');
        },
      },
    ],
  });
}

interface UseHighlightedCodeOptions {
  code?: string;
  /**
   * Support only tsx at the moment
   */
  lang?: 'tsx';
}

export function useHighlightedCode(options: UseHighlightedCodeOptions = {}) {
  const { code = '', lang = 'tsx' } = options;

  const [highlighted, setHighlighted] = useState<string | null>(null);

  const formattedCode = formatLines(code).join('\n');
  const placeholder = getPlaceholderHtml(formattedCode);

  useEffect(() => {
    let isMounted = true;

    async function fetchHighlighted() {
      const formattedCode = formatLines(code).join('\n');
      const highlighted = await getHighlightedCode(formattedCode, lang);
      if (isMounted) {
        setHighlighted(highlighted);
      }
    }

    fetchHighlighted();
    return () => {
      isMounted = false;
    };
  }, [code, lang]);

  return highlighted ?? placeholder;
}
