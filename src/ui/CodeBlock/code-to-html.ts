import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

export const { codeToHtml } = await createHighlighterCore({
  engine: createOnigurumaEngine(import('shiki/wasm')),
  langs: [import('@shikijs/langs/tsx')],
  themes: [
    import('@shikijs/themes/github-dark'),
    import('@shikijs/themes/github-light'),
  ],
});
