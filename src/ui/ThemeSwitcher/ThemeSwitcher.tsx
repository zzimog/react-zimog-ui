import { Moon, Sun } from 'lucide-react';
import { Button, ButtonGroup } from '../Button';
import { useColorScheme } from '../hooks';

export const ThemeSwitcher = () => {
  const [scheme, setScheme] = useColorScheme();

  const selectedClasses = 'scale-90';

  return (
    <ButtonGroup size="sm" joined>
      <Button
        className={scheme === 'light' ? selectedClasses : ''}
        onClick={() => setScheme('light')}
      >
        <Sun />
      </Button>
      <Button
        className={scheme === 'dark' ? selectedClasses : ''}
        onClick={() => setScheme('dark')}
      >
        <Moon />
      </Button>
    </ButtonGroup>
  );
};
