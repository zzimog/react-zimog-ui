import { BrowserRouter, Route, Routes } from 'react-router';
import { cn, ThemeSwitcher } from '@ui';
import { Logo, MDXLoader } from '@app/components';
import {
  CardDemo,
  HighlightDemo,
  PageAccordion,
  PageCheckbox,
  PageCollapsible,
  PopoverDemo,
  ScrollAreaDemo,
  TabsDemo,
} from '@app/pages';
import { AppMenu, type MenuEntry } from './AppMenu';
import { PageField, PageHome, PageInput, PageSelect, PageTable } from './mdx';
import { TestPage as Test } from './Test';
import './App.css';

const _noop = () => {};
const pages: MenuEntry = {
  styled: {
    accordion: PageAccordion,
    checkbox: PageCheckbox,
    collapsible: PageCollapsible,
    input: _noop,
    field: _noop,
    select: _noop,
    table: _noop,
  },
  old: {
    card: CardDemo,
    highlight: HighlightDemo,
    popover: PopoverDemo,
    scrollarea: ScrollAreaDemo,
    tabs: TabsDemo,
  },
};

const routes: Record<string, any> = {
  'styled/input': PageInput,
  'styled/field': PageField,
  'styled/select': PageSelect,
  'styled/table': PageTable,
};

export default () => (
  <div
    className={cn(
      'min-h-screen',
      'text-foreground',
      'bg-background',
      'transition-colors'
    )}
  >
    <div className="mx-auto w-full max-w-3xl p-4">
      <BrowserRouter basename="react-zimog-ui">
        <header className="mb-16 flex h-16 items-center justify-between gap-2">
          <AppMenu data={pages} />

          <a aria-label="UI" title="UI Homepage" href="/">
            <Logo className="size-16" />
          </a>

          <ThemeSwitcher size="sm" />
        </header>

        <Routes>
          <Route index element={<MDXLoader mdx={PageHome} />} />

          {Object.entries(routes).map(([path, page]) => (
            <Route
              key={path}
              path={path}
              element={
                <main>
                  <MDXLoader mdx={page} />
                </main>
              }
            />
          ))}

          {Object.keys(pages).map((category) =>
            Object.entries(pages[category] as any).map(([name, Comp]: any) => (
              <Route
                key={`${category}-${name}`}
                path={`${category}/${name}`}
                element={<Comp />}
              />
            ))
          )}

          <Route path="test" element={<Test />} />
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);
