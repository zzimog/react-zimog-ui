import { Card } from '@ui';
import type { ReactNode } from 'react';
import { CodeBlock } from '../../ui/CodeBlock';

type Props = {
  title: string;
  code: string;
  headless?: boolean;
  children?: ReactNode;
};

export const DemoContainer = (props: Props) => (
  <article className="w-full">
    <div className="flex items-end gap-4 py-6">
      <h2 className="text-2xl/none font-semibold">{props.title}</h2>
      {props.headless && (
        <span className="px-1.5 py-1 rounded-md text-[0.65rem]/none font-bold uppercase text-primary-contrast bg-primary">
          headless
        </span>
      )}
    </div>

    <main
      aria-label="live demo"
      className="flex flex-col items-center gap-2 px-4 py-20 rounded-t-shape bg-linear-to-br from-indigo-500 to-violet-500"
    >
      {props.children}
    </main>

    <Card className="w-full rounded-t-none">
      <CodeBlock>{props.code}</CodeBlock>
    </Card>
  </article>
);
