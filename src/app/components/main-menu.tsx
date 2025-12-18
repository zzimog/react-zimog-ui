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
      <span className="inline-block text-2xl/none text-muted transition-colors mr-2 pl-2 border-l border-muted/50">
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
    className="mr-2 cursor-pointer underline-offset-4 hover:underline has-aria-[current=page]:underline"
  />
);

MainMenu.Submenu = MainMenuSubmenu;
MainMenu.Entry = MainMenuEntry;
