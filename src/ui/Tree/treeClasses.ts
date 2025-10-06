import { cn } from '../utils';

const treeClasses = {
  root: 'relative group overflow-hidden',
  highlight: cn([
    'absolute',
    'rounded-md',
    'bg-gray-500/15',
    'transition-[width,height,transform,opacity]',
    'duration-100',
    'z-0',
    'opacity-0',
    'group-has-hover:opacity-100',
  ]),
  list: {
    root: cn([
      'relative',
      'z-1',
      '[&_ul]:ml-3.5',
      '[&_ul]:pl-2',
      '[&_ul]:border-l',
      '[&_ul]:border-gray-500/20',
    ]),
    item: cn([
      'flex',
      'items-center',
      'justify-start',
      'gap-2',
      'p-2',
      'cursor-pointer',
      '[&_svg]:size-4',
      '[&_svg]:shrink-0',
    ]),
  },
};

export default treeClasses;
