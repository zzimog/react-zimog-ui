import { ThemeSwitcher } from '@ui';
import buttons from './demo/buttons';
import headings from './demo/headings';
import inputs from './demo/inputs';
import spinners from './demo/spinners';

const App = () => {
  return (
    <div className="min-h-screen dark:text-white dark:bg-black">
      <div className="max-w-5xl mx-auto flex flex-col gap-6 p-6">
        <div className="ml-auto">
          <ThemeSwitcher />
        </div>

        <ul>
          <li>
            <a href="#headings">Headings</a>
          </li>
          <li>
            <a href="#buttons">Buttons</a>
          </li>
          <li>
            <a href="#inputs">Inputs</a>
          </li>
          <li>
            <a href="#spinners">Spinners</a>
          </li>
        </ul>

        {buttons}
        {headings}
        {inputs}
        {spinners}
      </div>
    </div>
  );
};

export default App;
