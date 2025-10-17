import { cn } from '../utils';

const treeClasses = {
  root: 'relative overflow-visible',
  highlight: '',
  list: {
    root: cn([
      'relative z-2',
      '[&_ul]:ml-3.5',
      '[&_ul]:pl-2',
      '[&_ul]:border-l',
      '[&_ul]:border-gray-500/20',
    ]),
    item: cn([
      'item',
      'flex',
      'items-center',
      'justify-start',
      'gap-2',
      'p-2',
      'cursor-pointer',
      'select-none',
      '[&_svg]:size-4',
      '[&_svg]:shrink-0',
      '[&_svg]:transition-transform',
      '[&_svg]:duration-100',
      'data-[state="open"]:[&_svg]:rotate-90',
    ]),
  },
};

export default treeClasses;
