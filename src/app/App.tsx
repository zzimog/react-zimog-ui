import { BrowserRouter, NavLink, Route, Routes } from 'react-router';
import { ScrollArea, ThemeSwitcher } from '@ui';
import './App.css';
import { MainMenu } from './components/main-menu';
import {
  AccordionDemo,
  CardDemo,
  CollapsibleDemo,
  DisclosureDemo,
  HighlightDemo,
  PopoverDemo,
  PresenceDemo,
  ScrollAreaDemo,
} from './examples';
import { TestPage as Test } from './Test';

const components: Record<string, Record<string, any>> = {
  headless: {
    collapsible: CollapsibleDemo,
    disclosure: DisclosureDemo,
    highlight: HighlightDemo,
    popover: PopoverDemo,
    presence: PresenceDemo,
  },
  styled: {
    accordion: AccordionDemo,
    card: CardDemo,
    scrollarea: ScrollAreaDemo,
  },
};

export default () => (
  <ScrollArea
    className={[
      'h-screen',
      'transition-colors',
      'text-foreground',
      'bg-white',
      'dark:bg-black',
    ].join(' ')}
  >
    <div className="mx-auto flex w-full max-w-200 flex-col gap-10 px-4 py-16">
      <header className="flex items-center justify-between gap-2">
        <h1 className="self-start text-4xl">ui demo</h1>
        <ThemeSwitcher size="sm" />
      </header>

      <BrowserRouter basename="react-zimog-ui">
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
  </ScrollArea>
);
