import { cn } from '../utils';

const treeClasses = {
  root: 'relative group',
  highlight: cn([
    'absolute',
    'rounded-md',
    'bg-gray-500/15',
    'transition-[width,height,transform,opacity]',
    'duration-200',
    'z-0',
    'opacity-0',
    'group-has-hover:opacity-100',
  ]),
  list: {
    root: cn(['relative', 'z-1']),
    item: cn([
      'flex',
      'items-center',
      'justify-start',
      'p-2',
      'cursor-pointer',
      'before:content-[""]',
      'before:block',
      'before:w-px',
      'before:h-full',
      'before:bg-primary',
    ]),
  },
};

export default treeClasses;
