import type { ComponentProps, ReactNode } from 'react';
import { Card, cn, CodeBlock } from '@ui';
import { Nav } from './Nav';

/*---------------------------------------------------------------------------*/
// Page
/*---------------------------------------------------------------------------*/

type BaseProps = ComponentProps<'main'>;
interface PageProps extends BaseProps {
  title: string;
  menu?: Record<string, string>;
}

export const Page = (inProps: PageProps) => {
  const { id, title, menu = {}, className, children, ...props } = inProps;

  const hasItems = Object.keys(menu).length === 0;
  const items = Object.entries(menu).map(([href, label]) => ({
    href: `#${id}-${href}`,
    label,
  }));

  return (
    <main {...props} className={cn('relative flex flex-col gap-12', className)}>
      <h1 className="text-3xl/none font-semibold">{title}</h1>

      <Nav
        aria-label={`${title} contents`}
        hidden={hasItems}
        className="border-l px-4"
      >
        {items.map(({ href, label }, i) => (
          <Nav.Item key={i}>
            <Nav.Link href={href}>{label}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {children}
    </main>
  );
};

Page.displayName = 'Page';

/*---------------------------------------------------------------------------*/
// PageArticle
/*---------------------------------------------------------------------------*/

type ArticleBaseProps = ComponentProps<'article'>;
interface PageArticleProps extends ArticleBaseProps {
  title: string;
  description?: ReactNode;
  code?: string;
}

export const PageArticle = (inProps: PageArticleProps) => {
  const { title, description, children, code, ...props } = inProps;

  return (
    <article {...props}>
      <header className="mb-8 flex flex-col gap-4">
        <Card.Title as="h2" className="text-xl/none">
          {title}
        </Card.Title>

        {description && (
          <Card.Description as="p">{description}</Card.Description>
        )}
      </header>

      <Card as="section">
        <Card.Content className={code ? 'border-b' : undefined}>
          {children}
        </Card.Content>

        {code && <CodeBlock className="-my-6">{code}</CodeBlock>}
      </Card>
    </article>
  );
};

PageArticle.displayName = 'PageArticle';
Page.Article = PageArticle;
