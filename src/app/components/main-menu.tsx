import type { ComponentProps } from 'react';

export const MainMenu = (props: ComponentProps<'nav'>) => (
  <nav {...props} aria-label="main menu" />
);

const MainMenuSubmenu = ({
  title,
  children,
  ...props
}: ComponentProps<'span'>) => (
  <span {...props} aria-label={title}>
    <span className="text-2xl/none text-muted-foreground dark:text-muted-background transition-colors pl-1 mr-1 border-l border-muted-foreground/50 dark:border-muted-background/50">
      {title}
    </span>
    {children}
  </span>
);

const MainMenuEntry = (props: ComponentProps<'span'>) => (
  <span
    {...props}
    role="link"
    className="mr-1 cursor-pointer underline-offset-4 hover:underline"
  />
);

MainMenu.Submenu = MainMenuSubmenu;
MainMenu.Entry = MainMenuEntry;
