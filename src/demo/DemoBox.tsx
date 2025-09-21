import type { ReactNode } from 'react';
import { Box, Title } from '@ui';

export const DemoBox = (props: {
  id?: string;
  title: string;
  children: ReactNode;
}) => {
  const { id, title, children } = props;

  return (
    <Box as="section">
      <header className="-mt-2 mb-4 pb-4 border-b border-gray-500/20">
        <Title id={id} size={1} children={title} />
      </header>
      <main className="flex flex-col gap-4">{children}</main>
    </Box>
  );
};
