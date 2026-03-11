import { BrowserRouter, Route, Routes } from 'react-router';
import { Card, cn, ThemeSwitcher } from '@ui';
import { Logo, MDXLoader } from '@app/components';
import {
  CardDemo,
  HighlightDemo,
  PageAccordion,
  PageCheckbox,
  PageCollapsible,
  PageInput,
  PagePresence,
  PageSelect,
  PopoverDemo,
  ScrollAreaDemo,
  TabsDemo,
} from '@app/pages';
import { AppMenu, type MenuEntry } from './AppMenu';
import HomePage from './mdx/home.mdx';
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
    input: PageInput,
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
          <Route
            index
            element={
              <MDXLoader
                mdx={HomePage}
                components={{
                  Article: ({ className, ...props }) => (
                    <article {...props} className={cn('mb-16', className)} />
                  ),
                  Card: ({ className, ...props }) => (
                    <Card {...props} className={cn('border-b', className)} />
                  ),
                  Content: ({ className, ...props }) => (
                    <Card.Content
                      {...props}
                      className={cn(
                        'not-last:pb-6',
                        'not-last:border-b',
                        className
                      )}
                    />
                  ),
                }}
              />
            }
          />

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
