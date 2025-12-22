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
      <span className="text-muted border-muted/50 mr-2 inline-block border-l pl-2 text-2xl/none transition-colors">
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
