import type { MDXContent } from 'mdx/types';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { ThemeSwitcher } from '@ui';
import { Logo, MDXLoader } from '@app/components';
import { AppMenu } from './AppMenu';
import {
  PageCard,
  PageField,
  PageHome,
  PageInput,
  PageSelect,
  PageTable,
} from './mdx';
import { TestPage as Test } from './Test';
import './App.css';

const components: Record<string, MDXContent> = {
  card: PageCard,
  input: PageInput,
  field: PageField,
  select: PageSelect,
  table: PageTable,
};

const App = () => (
  <div className="text-foreground bg-background min-h-screen transition-colors">
    <div className="mx-auto w-full max-w-3xl p-4">
      <BrowserRouter basename="react-zimog-ui">
        <header className="mb-16 flex h-16 items-center justify-between gap-2">
          <AppMenu data={components} />

          <Link to="/" aria-label="Homepage" title="Homepage">
            <Logo className="size-16" />
          </Link>

          <ThemeSwitcher size="sm" />
        </header>

        <main>
          <Routes>
            <Route index element={<MDXLoader mdx={PageHome} />} />

            {Object.entries(components).map(([name, page]) => (
              <Route
                key={name}
                path={name}
                element={<MDXLoader mdx={page} />}
              />
            ))}

            <Route path="test" element={<Test />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
