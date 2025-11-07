import type { ReactNode } from 'react';
import { Card, cn } from '@ui';

export const DemoBox = (props: {
  id?: string;
  title: string;
  children: ReactNode;
  row?: boolean;
  center?: boolean;
}) => {
  const { id, title, children, row, center } = props;

  return (
    <Card as="article">
      <Card.Header>
        <Card.Title as="h2" id={id}>
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Content
        as="main"
        className={cn(
          'flex gap-4',
          !row && 'flex-col',
          center && (row ? 'justify-center' : 'items-center')
        )}
      >
        {children}
      </Card.Content>
    </Card>
  );
};
