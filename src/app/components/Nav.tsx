import { useLayoutEffect, useState, type ComponentProps } from 'react';
import { NavLink as RouterLink } from 'react-router';
import { cn } from '@ui';

/*---------------------------------------------------------------------------*/
// Nav
/*---------------------------------------------------------------------------*/

type NavBaseProps = ComponentProps<'nav'>;
interface NavProps extends NavBaseProps {}

export const Nav = (props: NavProps) => <nav {...props} />;

Nav.displayName = 'Nav';

/*---------------------------------------------------------------------------*/
// NavList
/*---------------------------------------------------------------------------*/

type ListBaseProps = ComponentProps<'ul'>;
interface NavListProps extends ListBaseProps {}

export const NavList = ({ className, ...props }: NavListProps) => (
  <ul
    {...props}
    className={cn('text-muted text-sm/6 font-semibold transition', className)}
  />
);

NavList.displayName = 'NavList';
Nav.List = NavList;

/*---------------------------------------------------------------------------*/
// NavItem
/*---------------------------------------------------------------------------*/

type ItemBaseProps = ComponentProps<'li'>;
interface NavItemProps extends ItemBaseProps {}

const NavItem = (props: NavItemProps) => <li {...props} />;

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
    'inline-block',
    'transition',
    'hover:underline',
    'hover:text-foreground',
    'data-highlight:text-foreground',
    className
  );

  if (!href) {
    return <span {...props} />;
  }

  if (isAnchor) {
    return (
      <a
        data-highlight={isAnchor && isVisible ? '' : undefined}
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
