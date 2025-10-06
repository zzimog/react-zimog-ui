import { Tree, type TreeProps } from '@ui';
import { DemoBox } from './DemoBox';

const data: TreeProps['data'] = [
  {
    name: 'app',
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

const tree = (
  <DemoBox id="tree" title="Tree">
    <Tree data={data} />
  </DemoBox>
);

export default tree;
