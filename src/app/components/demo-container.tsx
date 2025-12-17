import { Card, CodeBlock } from '@ui';
import type { PropsWithChildren } from 'react';

type DemoContainerProps = PropsWithChildren<{
  title: string;
  code: string;
  headless?: boolean;
}>;

export const DemoContainer = ({
  title,
  code,
  headless,
  children,
  ...props
}: DemoContainerProps) => (
  <article {...props} className="w-full">
    <div className="flex items-end gap-4 py-6">
      <h2 className="text-2xl/none lowercase grow">{title}</h2>
      {headless && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs/none uppercase text-primary-contrast bg-primary shrink-0">
          headless
        </span>
      )}
    </div>

    <main
      aria-label="live demo"
      className="flex flex-col items-center gap-2 px-4 py-20 rounded-t-shape bg-linear-to-br from-indigo-500 to-violet-500"
    >
      {children}
    </main>

    <Card className="w-full rounded-t-none">
      <CodeBlock>{code}</CodeBlock>
    </Card>
  </article>
);
