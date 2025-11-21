import { Moon, Sun } from 'lucide-react';
import { Button } from '../Button';
import { useTheme } from '../hooks';
import { capitalize } from '../utils';

export const ThemeSwitcher = () => {
  const [scheme, setScheme] = useTheme();

  const isDark = scheme === 'dark';
  const other = isDark ? 'light' : 'dark';

  return (
    <Button
      size="sm"
      variant="ghost"
      title={`${capitalize(other)} mode`}
      onClick={() => setScheme(other)}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};
