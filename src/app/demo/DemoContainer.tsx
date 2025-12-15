import { Card, Title } from '@ui';
import type { ReactNode } from 'react';
import { CodeBlock } from '../../ui/CodeBlock';

type Props = {
  title: string;
  code: string;
  children?: ReactNode;
};

export const DemoContainer = (props: Props) => (
  <div className="w-full">
    <Title size={2} className="py-6 leading-none">
      {props.title}
    </Title>

    <div className="flex flex-col items-center gap-2 px-4 py-20 rounded-t-shape bg-linear-to-br from-indigo-500 to-violet-500">
      {props.children}
    </div>

    <Card className="w-full rounded-t-none">
      <CodeBlock>{props.code}</CodeBlock>
    </Card>
  </div>
);
