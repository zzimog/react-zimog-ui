import type { MDXContent } from 'mdx/types';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { ThemeSwitcher } from '@ui';
import { Logo, MDXLoader, Nav } from '@app/components';
import { AppMenu } from './AppMenu';
import {
  PageCard,
  PageField,
  PageHome,
  PageInput,
  PagePresence,
  PageSelect,
  PageTable,
} from './docs';
import { TestPage as Test } from './Test';
import './App.css';

const components: Record<string, MDXContent> = {
  card: PageCard,
  input: PageInput,
  field: PageField,
  select: PageSelect,
  table: PageTable,
  presence: PagePresence,
};

const App = () => (
  <BrowserRouter basename="react-zimog-ui">
    <div className="text-foreground bg-background min-h-screen transition-colors">
      <header className="mb-8 border-b py-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4">
          <AppMenu data={components} />

          <Link to="/" aria-label="Homepage" title="Homepage">
            <Logo className="size-16" />
          </Link>

          <ThemeSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-3xl p-4 mb-32">
        <Routes>
          <Route index element={<MDXLoader mdx={PageHome} />} />

          {Object.entries(components).map(([name, page]) => (
            <Route key={name} path={name} element={<MDXLoader mdx={page} />} />
          ))}

          <Route path="test" element={<Test />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>

      <footer className="text-muted border-t py-8 mt-8">
        <div className="flex justify-center gap-6 px-4">
          <Nav.Link href="https://github.com/zzimog" target="_blank">
            github/zzimog
          </Nav.Link>
          <Nav.Link
            href="https://github.com/zzimog/react-zimog-ui"
            target="_blank"
          >
            github/ui
          </Nav.Link>
        </div>
      </footer>
    </div>
  </BrowserRouter>
);

export default App;
