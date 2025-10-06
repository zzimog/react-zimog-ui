import { Card, ThemeSwitcher } from '@ui';
import accordion from './demo/accordion';
import buttons from './demo/buttons';
import headings from './demo/headings';
import inputs from './demo/inputs';
import popper from './demo/popper';
import spinners from './demo/spinners';
import tabs from './demo/tabs';
import usePopper from './demo/usePopper';
import tree from './demo/tree';

const App = () => {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      <div className="w-full flex justify-end ml-auto mb-2">
        <ThemeSwitcher />
      </div>
      <Card as="aside" className="shrink-0 grow-0 basis-[300px]">
        <ul>
          <li>
            <a href="#buttons">Buttons</a>
          </li>
          <li>
            <a href="#headings">Headings</a>
          </li>
          <li>
            <a href="#inputs">Inputs</a>
          </li>
          <li>
            <a href="#spinners">Spinners</a>
          </li>
        </ul>
      </Card>
      <main className="grow-1">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-6">
            {[
              tree,
              usePopper,
              tabs,
              accordion,
              popper,
              buttons,
              headings,
              inputs,
              spinners,
            ]}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
