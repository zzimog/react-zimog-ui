import { Moon, Sun } from 'lucide-react';
import { Button } from '../Button';
import { useTheme } from '../hooks';
import { capitalize } from '../utils';

export const ThemeSwitcher = () => {
  const [scheme, setScheme] = useTheme();

  const isDark = scheme === 'dark';

  return (
    <Button
      size="sm"
      variant="ghost"
      title={`${capitalize(scheme)} mode`}
      onClick={() => setScheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};
