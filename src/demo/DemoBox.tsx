import type { ReactNode } from 'react';
import { cn, Title } from '../ui';

export const DemoBox = (props: {
  title: string;
  children: ReactNode;
  id?: string;
  row?: boolean;
}) => {
  const { title, children, id, row = false } = props;

  return (
    <div
      className={cn(
        'px-8 py-4',
        'rounded-md',
        'border border-neutral-500/20',
        'bg-neutral-500/10 dark:bg-neutral-500/25'
      )}
    >
      <Title {...{ id }} className="mb-2 pb-2 border-b border-neutral-500/20">
        {title}
      </Title>
      <div
        className={cn(
          'flex justify-center items-center gap-2',
          row
            ? 'justify-start items-center'
            : 'flex-col items-start justify-center'
        )}
      >
        {children}
      </div>
    </div>
  );
};
