import { Card, ThemeSwitcher } from '@ui';
import accordion from './demo/accordion';
import buttons from './demo/buttons';
import headings from './demo/headings';
import inputs from './demo/inputs';
import popper from './demo/popper';
import spinners from './demo/spinners';
import tabs from './demo/tabs';
import tree from './demo/tree';
import usePopper from './demo/usePopper';

const App = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-wrap gap-4 py-4">
      <div className="w-full flex justify-end ml-auto">
        <ThemeSwitcher />
      </div>
      <main className="flex flex-col gap-4">
        {accordion}
        {buttons}
        {headings}
        {inputs}
        {popper}
        {spinners}
        {tabs}
        {tree}
        {usePopper}
      </main>
    </div>
  );
};

export default App;
