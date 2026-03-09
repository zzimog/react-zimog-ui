import { useLayoutEffect, useState, type ComponentProps } from 'react';
import { cn } from '@ui';

type ItemBaseProps = ComponentProps<'li'>;
interface PageNavItemProps extends ItemBaseProps {
  href?: string;
  label: string;
}

const PageNavItem = (inProps: PageNavItemProps) => {
  const { href = '', label, className, children, ...props } = inProps;

  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const isAnchor = href?.startsWith('#');
    if (isAnchor) {
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

  return (
    <li {...props} className={cn('py-1', className)}>
      <a
        href={href}
        data-highlight={isVisible ? '' : undefined}
        className="hover:text-foreground data-highlight:text-foreground transition hover:underline"
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

export const PageNav = ({ children, ...props }: PageNavProps) => (
  <nav aria-label="Page contents" {...props}>
    <ol className="text-muted border-l px-4 text-sm font-semibold transition">
      {children}
    </ol>
  </nav>
);

PageNav.displayName = 'PageNav';
PageNav.Item = PageNavItem;
