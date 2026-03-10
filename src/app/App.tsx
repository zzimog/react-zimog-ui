import { BrowserRouter, Route, Routes } from 'react-router';
import { cn, ThemeSwitcher } from '@ui';
import {
  // need refactor
  AccordionDemo,
  CardDemo,
  HighlightDemo,
  PopoverDemo,
  PresenceDemo,
  ScrollAreaDemo,
  TabsDemo,
  // need refactor
} from '@app/examples';
import { Nav } from './components';
import {
  PageCheckbox,
  PageCollapsible,
  PageInput,
  PageSelect,
} from './examples';
import { TestPage as Test } from './Test';
import './App.css';
import { Home } from 'lucide-react';

const components: Record<string, Record<string, any>> = {
  headless: {
    highlight: HighlightDemo,
    popover: PopoverDemo,
    presence: PresenceDemo,
  },
  styled: {
    accordion: AccordionDemo,
    card: CardDemo,
    scrollarea: ScrollAreaDemo,
    tabs: TabsDemo,
  },
  refactored: {
    checkbox: PageCheckbox,
    collapsible: PageCollapsible,
    input: PageInput,
    select: PageSelect,
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
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <BrowserRouter basename="react-zimog-ui">
        <header className="sticky top-16 flex items-start gap-4">
          <Nav
            className={cn(
              'absolute',
              'right-full',
              'mr-8',
              'border-r',
              'pr-8',
              'text-right',
              'capitalize'
            )}
          >
            <Nav.Item>
              <Nav.Link aria-label="Home" title="Home" href="/">
                <Home className="inline" />
              </Nav.Link>
            </Nav.Item>

            {Object.keys(components).map((category, i) => (
              <Nav.Menu key={i} className="my-4">
                <span className="text-foreground block pb-1 text-xl font-semibold">
                  {category}
                </span>

                {Object.keys(components[category]).map((name, i) => (
                  <Nav.Item key={i}>
                    <Nav.Link href={`/${category}/${name}`}>{name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav.Menu>
            ))}

            <Nav.Item>
              <Nav.Link href="/test" className="mt-4 font-mono lowercase">
                [test]
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <ThemeSwitcher size="sm" className="absolute left-full ml-4" />
        </header>

        <Routes>
          <Route
            index
            element={
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident, aperiam. Dolore a, quis porro soluta repellat numquam
                eius voluptatum sapiente similique atque, vitae aspernatur ipsum
                quibusdam doloribus modi cupiditate. Voluptate!
              </p>
            }
          />

          {Object.keys(components).map((category) =>
            Object.entries(components[category]).map(([name, Comp]) => (
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
