import { useRef, useEffect } from 'react';
import { DemoBox } from './DemoBox';
import { type TreeProps, Tree } from '@ui';

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
  const heightRef = useRef(0);

  useEffect(() => {
    const node = ref.current;
    console.log('here', node);

    if (node) {
      let rafId = requestAnimationFrame(function loop() {
        const height = node.offsetHeight;

        if (height > heightRef.current) {
          node.style.height = `${height}px`;
          heightRef.current = height;
        }

        rafId = requestAnimationFrame(loop);
      });

      return () => cancelAnimationFrame(rafId);
    }
  }, []);

  return (
    <DemoBox id="tree" title="Tree">
      <Tree ref={ref} data={data} />
    </DemoBox>
  );
};

export default <DemoTree />;
