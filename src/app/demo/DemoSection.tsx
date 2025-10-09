import type { ReactNode } from 'react';
import { Title, cn } from '@ui';

export const DemoSection = (props: {
  id?: string;
  title: string;
  children: ReactNode;
  column?: boolean;
  gap?: boolean;
}) => {
  const { id, title, children, column, gap = true } = props;

  return (
    <article>
      <header className="mb-2">
        <Title id={id} size={2} children={title} />
      </header>
      <main
        children={children}
        className={cn(
          'w-full',
          'flex',
          'justify-center',
          'items-center',
          gap && 'gap-2',
          column && 'flex-col'
        )}
      />
    </article>
  );
};
