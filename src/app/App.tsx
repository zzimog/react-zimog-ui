import { ScrollArea, ThemeSwitcher } from '@ui';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router';
import './App.css';
import { MainMenu } from './components/main-menu';
import {
  CardDemo,
  DisclosureDemo,
  PopoverDemo,
  PresenceDemo,
  ScrollAreaDemo,
} from './examples';
import Test from './Test3';

const components: Record<string, Record<string, any>> = {
  headless: {
    disclosure: DisclosureDemo,
    popover: PopoverDemo,
    presence: PresenceDemo,
  },
  styled: {
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
      'dark:text-background',
      'dark:bg-black',
      'overflow-hidden',
    ].join(' ')}
  >
    <div className="max-w-200 w-full flex flex-col gap-10 mx-auto px-4 py-16">
      <header className="flex justify-between items-center gap-2">
        <h1 className="text-4xl self-start">ui demo</h1>
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
