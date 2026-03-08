import { useId, type ComponentProps } from 'react';
import { cn } from '@ui';

type ItemBaseProps = ComponentProps<'li'>;
interface PageNavItemProps extends ItemBaseProps {
  href?: string;
  label: string;
}

const PageNavItem = (inProps: PageNavItemProps) => {
  const { href, label, className, children, ...props } = inProps;

  return (
    <li {...props} className={cn('py-1', className)}>
      <a
        href={href}
        className="hover:text-foreground transition hover:underline"
      >
        {label}
      </a>
      {children}
    </li>
  );
};

PageNavItem.displayName = 'PageNavItem';

/*---------------------------------------------------------------------------*/

type BaseProps = ComponentProps<'nav'>;
interface PageNavProps extends BaseProps {}

export const PageNav = (inProps: PageNavProps) => {
  const { children, ...props } = inProps;
  const id = useId();

  return (
    <nav aria-labelledby={id} {...props}>
      <h4 id={id} className="mb-2 text-lg font-semibold">
        Page contents
      </h4>
      <ol className="text-muted border-l px-4 text-sm font-semibold transition">
        {children}
      </ol>
    </nav>
  );
};

PageNav.displayName = 'PageNav';
PageNav.Item = PageNavItem;
