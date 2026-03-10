import { type ComponentProps, type ReactNode } from 'react';
import { Card, cn, CodeBlock, createScopedContext } from '@ui';
import { Nav } from './Nav';

/*---------------------------------------------------------------------------*/
// Page
/*---------------------------------------------------------------------------*/

const PAGE_NAME = 'Page';

interface PageContextValue {
  baseId: string;
  sections: Record<string, string>;
}

const [PageContext, usePageContext] = createScopedContext<
  PageContextValue | undefined
>('Page', undefined);

/*---------------------------------------------------------------------------*/

type BaseProps = ComponentProps<'main'>;
interface PageProps extends BaseProps {
  id: string;
  title: string;
  menu?: Record<string, string>;
}

export const Page = (inProps: PageProps) => {
  const { id, title, menu = {}, children, ...props } = inProps;

  const hasItems = Object.keys(menu).length === 0;
  const items = Object.entries(menu).map(([href, label]) => ({
    href: `#${id}-${href}`,
    label,
  }));

  return (
    <main {...props}>
      <div className="sticky top-16">
        <Nav
          aria-label={`${title} contents`}
          hidden={hasItems}
          className="absolute left-full ml-4 border-l pl-4"
        >
          <Nav.List>
            {items.map(({ href, label }, i) => (
              <Nav.Item key={i}>
                <Nav.Link href={href}>{label}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav.List>
        </Nav>
      </div>

      <h1 className="mb-4 text-3xl/none font-semibold">{title}</h1>
      <PageContext baseId={id} sections={menu}>
        {children}
      </PageContext>
    </main>
  );
};

Page.displayName = PAGE_NAME;

/*---------------------------------------------------------------------------*/
// PageArticle
/*---------------------------------------------------------------------------*/

const PAGE_ARTICLE_NAME = 'PageArticle';

type ArticleBaseProps = Omit<ComponentProps<'article'>, 'title'>;
interface PageArticleProps extends ArticleBaseProps {
  id: string;
  title?: boolean;
  description?: ReactNode;
  code?: string;
}

export const PageArticle = (inProps: PageArticleProps) => {
  const {
    id,
    code,
    title = true,
    description,
    className,
    children,
    ...props
  } = inProps;

  const { baseId, sections } = usePageContext(PAGE_ARTICLE_NAME);
  const composedId = `${baseId}-${id}`;
  const sectionTitle = sections[id];

  return (
    <article
      id={composedId}
      {...props}
      className={cn('not-last:mb-12', className)}
    >
      <header className="mb-8 flex flex-col gap-4">
        {title && <h2 className="text-xl/none">{sectionTitle}</h2>}
        {description && <p className="text-muted">{description}</p>}
      </header>

      <Card as="section" className="block p-0">
        <Card.Content className="p-6 not-last:border-b">
          {children}
        </Card.Content>

        {code && <CodeBlock>{code}</CodeBlock>}
      </Card>
    </article>
  );
};

PageArticle.displayName = PAGE_ARTICLE_NAME;
Page.Article = PageArticle;
