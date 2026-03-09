import { BrowserRouter, NavLink, Route, Routes } from 'react-router';
import { ThemeSwitcher } from '@ui';
import './App.css';
//
import PageCheckbox from '@app/examples/checkbox';
import PageCollapsible from '@app/examples/collapsible';
import PageInput from '@app/examples/input';
//
import { MainMenu } from './components/main-menu';
import {
  AccordionDemo,
  CardDemo,
  HighlightDemo,
  PopoverDemo,
  PresenceDemo,
  ScrollAreaDemo,
  TabsDemo,
} from './examples';
import { TestPage as Test } from './Test';

const components: Record<string, Record<string, any>> = {
  headless: {
    highlight: HighlightDemo,
    popover: PopoverDemo,
    presence: PresenceDemo,
  },
  styled: {
    accordion: AccordionDemo,
    card: CardDemo,
    collapsible: PageCollapsible,
    scrollarea: ScrollAreaDemo,
    tabs: TabsDemo,
    checkbox: PageCheckbox,
    input: PageInput,
  },
};

export default () => (
  <div
    className={[
      'min-h-screen',
      'transition-colors',
      'text-foreground',
      'bg-white',
      'dark:bg-black',
    ].join(' ')}
  >
    <div className="mx-auto flex w-full max-w-200 flex-col gap-10 px-4 py-16">
      <BrowserRouter basename="react-zimog-ui">
        <header className="flex items-start gap-4">
          <MainMenu>
            <MainMenu.Entry>
              <NavLink to="/">all</NavLink>
            </MainMenu.Entry>

            {Object.keys(components).map((category, i) => (
              <MainMenu.Submenu key={i} title={category}>
                {Object.keys(components[category]).map((name, i) => (
                  <MainMenu.Entry key={i}>
                    <NavLink to={`/${category}/${name}`}>{name}</NavLink>
                  </MainMenu.Entry>
                ))}
              </MainMenu.Submenu>
            ))}

            <MainMenu.Entry>
              <NavLink to="/test">[test]</NavLink>
            </MainMenu.Entry>
          </MainMenu>

          <ThemeSwitcher size="sm" />
        </header>

        <Routes>
          <Route
            index
            element={Object.values(components).flatMap((category, i) =>
              Object.values(category).map((Comp, j) => (
                <Comp key={`${i}-${j}`} />
              ))
            )}
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
