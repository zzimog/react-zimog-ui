import { Card, Title } from '@ui';
import type { ReactNode } from 'react';
import { CodeBlock } from '../CodeBlock';

type Props = {
  title: string;
  code: string;
  children?: ReactNode;
};

export const DemoContainer = (props: Props) => {
  return (
    <div className="max-w-200 w-full">
      <Title size={2} className="px-6 mb-4 leading-none">
        {props.title}
      </Title>

      <div className="flex justify-center px-4 py-20 rounded-t-shape bg-linear-to-br from-indigo-500 to-violet-500">
        {props.children}
      </div>

      <Card className="w-full rounded-t-none">
        <Card.Header>
          <Card.Title>Anathomy</Card.Title>
        </Card.Header>
        <CodeBlock>{props.code}</CodeBlock>
      </Card>
    </div>
  );
};
