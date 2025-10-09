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
    <div className="max-w-7xl mx-auto flex flex-wrap gap-4 py-4">
      <div className="w-full flex justify-end ml-auto">
        <ThemeSwitcher />
      </div>
      <Card as="aside" className="grow-1 basis-[300px]">
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
      <main className="grow-[9999] basis-[300px]">
        <div className="flex flex-col gap-4">
          {tree}
          {usePopper}
          {tabs}
          {accordion}
          {popper}
          {buttons}
          {headings}
          {inputs}
          {spinners}
        </div>
      </main>
    </div>
  );
};

export default App;
