import type { ComponentProps, ReactNode } from 'react';
import { Card, CodeBlock } from '@ui';

type BaseProps = ComponentProps<'article'>;
interface PageArticleProps extends BaseProps {
  title?: string;
  description?: ReactNode;
  code?: string;
}

export const PageArticle = (inProps: PageArticleProps) => {
  const { title, description, children, code, ...props } = inProps;
  const hasHeader = title || description;

  return (
    <article {...props}>
      {hasHeader && (
        <header className="mb-8 flex flex-col gap-4">
          {title && (
            <Card.Title as="h2" className="text-xl/none">
              {title}
            </Card.Title>
          )}

          {description && (
            <Card.Description as="p">{description}</Card.Description>
          )}
        </header>
      )}

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
