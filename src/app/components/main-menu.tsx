import type { ComponentProps } from 'react';

export const MainMenu = (props: ComponentProps<'nav'>) => (
  <nav aria-label="main menu" {...props} />
);

const MainMenuSubmenu = ({
  title,
  children,
  ...props
}: ComponentProps<'span'>) => (
  <span {...props} aria-label={title}>
    {title && (
      <span className="inline-block text-2xl/none text-muted-foreground dark:text-muted-background transition-colors pl-2 mr-2 border-l border-muted-foreground/50 dark:border-muted-background/50">
        {title}
      </span>
    )}
    {children}
  </span>
);

const MainMenuEntry = (props: ComponentProps<'span'>) => (
  <span
    role="link"
    {...props}
    className="mr-2 cursor-pointer underline-offset-4 hover:underline"
  />
);

MainMenu.Submenu = MainMenuSubmenu;
MainMenu.Entry = MainMenuEntry;
