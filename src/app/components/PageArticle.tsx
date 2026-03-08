import type { ComponentProps, ReactNode } from 'react';
import { Card, cn, CodeBlock } from '@ui';

type BaseProps = ComponentProps<'article'>;
interface PageArticleProps extends BaseProps {
  title: string;
  description?: ReactNode;
  code?: string;
}

export const PageArticle = (inProps: PageArticleProps) => {
  const { title, description, children, code, ...props } = inProps;

  return (
    <article {...props}>
      <header className="mb-8 flex flex-col gap-4">
        <Card.Title as="h3" className="text-xl/none">
          {title}
        </Card.Title>
        {description && (
          <Card.Description as="p">{description}</Card.Description>
        )}
      </header>

      <Card as="section">
        <Card.Content className={cn(code && 'border-b')}>
          {children}
        </Card.Content>

        {code && <CodeBlock className="-my-6">{code}</CodeBlock>}
      </Card>
    </article>
  );
};

PageArticle.displayName = 'PageArticle';
