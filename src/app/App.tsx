import { BrowserRouter, Route, Routes } from 'react-router';
import { cn, ThemeSwitcher } from '@ui';
import { Logo, MDXLoader } from '@app/components';
import {
  CardDemo,
  HighlightDemo,
  PageAccordion,
  PageCheckbox,
  PageCollapsible,
  PagePresence,
  PageSelect,
  PopoverDemo,
  ScrollAreaDemo,
  TabsDemo,
} from '@app/pages';
import { AppMenu, type MenuEntry } from './AppMenu';
import { PageField, PageHome, PageInput } from './mdx';
import { TestPage as Test } from './Test';
import './App.css';

const pages: MenuEntry = {
  headless: {
    presence: PagePresence,
  },
  styled: {
    accordion: PageAccordion,
    checkbox: PageCheckbox,
    collapsible: PageCollapsible,
    input: () => {},
    field: () => {},
    select: PageSelect,
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
                <>
                  <MDXLoader mdx={page} />
                </>
              }
            />
          ))}

          {Object.keys(pages).map((category) =>
            Object.entries(pages[category]).map(([name, Comp]) => (
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
