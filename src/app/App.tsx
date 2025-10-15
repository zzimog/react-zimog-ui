import { ThemeSwitcher, Title } from '@ui';
import accordion from './demo/accordion';
import tabs from './demo/tabs';
import tree from './demo/tree';

const App = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-wrap gap-4 py-4">
      <div className="w-full flex justify-between items-center px-2">
        <Title size={1}>UI Demo</Title>
        <ThemeSwitcher />
      </div>
      <main className="flex flex-col gap-4">
        {accordion}
        {tabs}
        {tree}
      </main>
    </div>
  );
};

export default App;
