import type { ReactNode } from 'react';
import { Box, cn, Title } from '@ui';

export const DemoBox = (props: {
  id?: string;
  title: string;
  children: ReactNode;
  row?: boolean;
  center?: boolean;
}) => {
  const { id, title, children, row, center } = props;

  return (
    <Box as="section">
      <header className="-mt-2 mb-4 pb-4 border-b border-gray-500/20">
        <Title id={id} size={1} children={title} />
      </header>
      <main
        className={cn(
          'flex gap-4',
          !row && 'flex-col',
          center && (row ? 'justify-center' : 'items-center')
        )}
      >
        {children}
      </main>
    </Box>
  );
};
