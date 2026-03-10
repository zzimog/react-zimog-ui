import { BrowserRouter, Route, Routes } from 'react-router';
import { cn, ThemeSwitcher } from '@ui';
import {
  // need refactor
  CardDemo,
  HighlightDemo,
  PopoverDemo,
  ScrollAreaDemo,
  TabsDemo,
  // need refactor
} from '@app/pages';
import {
  PageAccordion,
  PageCheckbox,
  PageCollapsible,
  PageInput,
  PagePresence,
  PageSelect,
} from './pages';
import { TestPage as Test } from './Test';
import './App.css';
import { AppMenu, type MenuEntry } from './AppMenu';
import { MainLayout } from './MainLayout';

const mainMenu: MenuEntry = {
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
    <MainLayout />

    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <BrowserRouter basename="react-zimog-ui">
        <header className="sticky top-16 flex items-start gap-4">
          <AppMenu data={mainMenu} />
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

          {Object.keys(mainMenu).map((category) =>
            Object.entries(mainMenu[category]).map(([name, Comp]) => (
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
