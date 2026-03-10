import { useLayoutEffect, useState, type ComponentProps } from 'react';
import { NavLink as RouterLink } from 'react-router';
import { cn } from '@ui';

/*---------------------------------------------------------------------------*/
// Nav
/*---------------------------------------------------------------------------*/

type NavBaseProps = ComponentProps<'nav'>;
interface NavProps extends NavBaseProps {}

export const Nav = ({ children, ...props }: NavProps) => (
  <nav {...props}>
    <NavMenu>{children}</NavMenu>
  </nav>
);

Nav.displayName = 'Nav';

/*---------------------------------------------------------------------------*/
// NavMenu
/*---------------------------------------------------------------------------*/

type MenuBaseProps = ComponentProps<'ol'>;
interface NavMenuProps extends MenuBaseProps {}

export const NavMenu = ({ className, ...props }: NavMenuProps) => (
  <ol
    {...props}
    className={cn('text-muted text-sm font-semibold transition', className)}
  />
);

NavMenu.displayName = 'NavMenu';
Nav.Menu = NavMenu;

/*---------------------------------------------------------------------------*/
// NavItem
/*---------------------------------------------------------------------------*/

type ItemBaseProps = ComponentProps<'li'>;
interface NavItemProps extends ItemBaseProps {}

const NavItem = ({ className, ...props }: NavItemProps) => (
  <li {...props} className={cn('py-1', className)} />
);

NavItem.displayName = 'NavItem';
Nav.Item = NavItem;

/*---------------------------------------------------------------------------*/
// NavMenu
/*---------------------------------------------------------------------------*/

type AnchorProps = ComponentProps<'a'>;
type RouterLinkProps = Omit<
  ComponentProps<typeof RouterLink>,
  'to' | keyof AnchorProps
>;
interface NavLinkProps extends RouterLinkProps, AnchorProps {}

export const NavLink = (inProps: NavLinkProps) => {
  const { href, className, ...props } = inProps;

  const [isVisible, setIsVisible] = useState(false);
  const isAnchor = href?.startsWith('#');

  useLayoutEffect(() => {
    if (href && isAnchor) {
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              setIsVisible(entry.isIntersecting);
            }),
          { threshold: 0.5 }
        );

        observer.observe(element);
        return () => observer.disconnect();
      }
    }
  }, [href]);

  const classes = cn(
    'transition',
    'hover:underline',
    'hover:text-foreground',
    'data-highlight:text-foreground',
    className
  );

  if (!href || isAnchor) {
    return (
      <a
        data-highlight={isVisible ? '' : undefined}
        href={href}
        {...props}
        className={classes}
      />
    );
  }

  return <RouterLink to={href} {...props} className={classes} />;
};

NavLink.displayName = 'NavLink';
Nav.Link = NavLink;
