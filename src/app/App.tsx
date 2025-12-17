import { ThemeSwitcher } from '@ui';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router';
import { MainMenu } from './components/main-menu';
import {
  CardDemo,
  DisclosureDemo,
  PopoverDemo,
  PresenceDemo,
  ScrollAreaDemo,
} from './examples';
import '../ui/index.css';

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
  <div
    className={[
      'min-h-screen',
      'transition-colors',
      'text-foreground',
      'bg-white',
      'dark:text-background',
      'dark:bg-black',
    ].join(' ')}
  >
    <ThemeSwitcher className="absolute top-2 right-2" />
    <div className="max-w-200 w-full flex flex-col gap-10 mx-auto px-4 py-16">
      <h1 className="text-4xl font-semibold self-start">ui demo</h1>

      <BrowserRouter basename="react-zimog-ui">
        <MainMenu>
          <MainMenu.Entry>
            <NavLink to="/">all</NavLink>
          </MainMenu.Entry>

          {Object.keys(components).map((category, i) => (
            <MainMenu.Submenu key={i} title={category}>
              {Object.keys(components[category]).map((name, i) => (
                <MainMenu.Entry>
                  <NavLink key={i} to={`/${category}/${name}`}>
                    {name}
                  </NavLink>
                </MainMenu.Entry>
              ))}
            </MainMenu.Submenu>
          ))}
        </MainMenu>

        <Routes>
          <Route
            index
            element={
              <>
                <DisclosureDemo />
                <PopoverDemo />
                <PresenceDemo />
                <CardDemo />
                <ScrollAreaDemo />
              </>
            }
          />

          <Route path="headless">
            <Route path="disclosure" element={<DisclosureDemo />} />
            <Route path="popover" element={<PopoverDemo />} />
            <Route path="presence" element={<PresenceDemo />} />
          </Route>

          <Route path="styled">
            <Route path="card" element={<CardDemo />} />
            <Route path="scrollarea" element={<ScrollAreaDemo />} />
          </Route>

          <Route element={<b>peep</b>} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);
