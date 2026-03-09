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
    <main {...props} className={cn('relative flex flex-col gap-12', className)}>
      <h1 className="text-3xl font-semibold">{title}</h1>
      {children}
    </main>
  );
};

Page.displayName = 'Page';
Page.Nav = PageNav;
Page.Article = PageArticle;
