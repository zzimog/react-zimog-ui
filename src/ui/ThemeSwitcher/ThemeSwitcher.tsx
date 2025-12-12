import { Moon, Sun } from 'lucide-react';
import { Button } from '../Button';
import { useTheme } from '../hooks';
import type { PolyProps } from '../polymorphic';

type ThemeSwitcherProps = PolyProps<typeof Button>;

export const ThemeSwitcher = (inProps: ThemeSwitcherProps) => {
  const [scheme, setScheme] = useTheme();

  const isDark = scheme === 'dark';
  const other = isDark ? 'light' : 'dark';

  return (
    <Button
      aria-hidden
      variant="ghost"
      {...inProps}
      title={`Set ${other} mode`}
      onClick={() => setScheme(other)}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};

ThemeSwitcher.displayName = 'ThemeSwitcher';
