import type { ComponentProps } from 'react';
import { cn } from '@ui';
import { PageArticle } from './PageArticle';
import { PageNav } from './PageNav';

type BaseProps = ComponentProps<'main'>;
interface PageProps extends BaseProps {
  title: string;
}

export const Page = (inProps: PageProps) => {
  const { title, className, children, ...props } = inProps;

  return (
    <main {...props} className={cn('flex flex-col gap-12', className)}>
      <h2 className="text-3xl font-semibold">{title}</h2>
      {children}
    </main>
  );
};

Page.displayName = 'Page';
Page.Nav = PageNav;
Page.Article = PageArticle;
