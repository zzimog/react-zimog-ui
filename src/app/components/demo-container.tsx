import type { PropsWithChildren } from 'react';
import { Card, CodeBlock } from '@ui';

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
      <h2 className="grow text-2xl/none lowercase">{title}</h2>
      {headless && (
        <span className="text-primary-contrast bg-primary inline-flex shrink-0 items-center rounded-full px-2 py-1 text-xs/none uppercase">
          headless
        </span>
      )}
    </div>

    <main
      aria-label="live demo"
      className="rounded-t-shape flex flex-col items-center gap-2 bg-linear-to-br from-indigo-500 to-violet-500 px-4 py-20"
    >
      {children}
    </main>

    <Card className="w-full rounded-t-none">
      <CodeBlock>{code.trim()}</CodeBlock>
    </Card>
  </article>
);
