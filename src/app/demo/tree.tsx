import { Tree, type TreeProps } from '@ui';
import { DemoBox } from './DemoBox';
import { useLayoutEffect, useRef } from 'react';

const data: TreeProps['data'] = [
  {
    name: 'app',
    items: [
      {
        name: '(home)',
        items: [
          {
            name: 'page.tsx',
          },
          {
            name: 'layout.tsx',
          },
        ],
      },
      {
        name: 'page.tsx',
      },
      {
        name: 'layout.tsx',
      },
    ],
  },
  {
    name: 'components',
    items: [
      {
        name: 'button.tsx',
      },
      {
        name: 'tabs.tsx',
      },
      {
        name: 'dialog.tsx',
      },
    ],
  },
  {
    name: 'package.json',
  },
];

const DemoTree = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      const height = node.offsetHeight;
      node.style.height = `${height}px`;
    }
  }, []);

  return (
    <DemoBox id="tree" title="Tree">
      <Tree ref={ref} data={data} />
    </DemoBox>
  );
};

export default <DemoTree />;
