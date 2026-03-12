import { useState, type PropsWithChildren } from 'react';
import type { MDXComponents, MDXContent } from 'mdx/types';
import { Card, cn, Code, CodeBlock, createScopedContext } from '@ui';
import * as UIComponents from '@ui';
import { createMDXElement } from './create-mdx-element';

const DISPLAY_NAME = 'MDXLoader';

interface MDXContextValue {
  baseId?: string;
  onBaseIdChange(baseId: string): void;
}

const [MDXContext, useMDXContext] = createScopedContext<
  MDXContextValue | undefined
>('MDXProvider', undefined);

/*---------------------------------------------------------------------------*/

interface MDXLoaderProps {
  mdx: MDXContent;
  components?: MDXComponents;
}

export const MDXLoader = ({ mdx: Mdx, components }: MDXLoaderProps) => {
  const [baseId, setBaseId] = useState<string | undefined>();

  return (
    <MDXContext baseId={baseId} onBaseIdChange={setBaseId}>
      <Mdx
        components={{
          h1: createMDXElement('h1', 'mb-8 text-4xl/none font-bold'),
          h2: createMDXElement('h2', 'mt-16 mb-4 text-xl/none font-semibold'),
          h3: createMDXElement('h3', 'mt-4 mb-2 text-lg/none font-semibold'),
          p: ({ className, ...props }) => (
            <p
              {...props}
              className={cn('text-muted mb-6 leading-relaxed', className)}
            />
          ),
          code: (props: any) =>
            !props.className ? <Code {...props} /> : <code {...props} />,
          pre: (props: PropsWithChildren) => (
            <Card data-mdx="pre" className="rounded-t-none border-t-0">
              <CodeBlock {...props} className="-my-6" />
            </Card>
          ),
          Demo: ({ children }: PropsWithChildren) => (
            <Card data-mdx="Demo" className="rounded-b-none">
              <Card.Content>{children}</Card.Content>
            </Card>
          ),
          ...(UIComponents as any),
          ...components,
        }}
      />
    </MDXContext>
  );
};

MDXLoader.displayName = DISPLAY_NAME;
MDXLoader.useContext = useMDXContext;
