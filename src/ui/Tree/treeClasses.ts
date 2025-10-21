import { cn } from '../utils';

const treeClasses = {
  root: 'relative',
  highlight: cn(
    'right-0 ',
    'w-(--w)',
    'h-(--h)',
    'translate-y-(--y)',
    '[@media(hover:none)]:hidden'
  ),
  list: {
    root: cn(
      'relative z-2',
      '[&_ul]:ml-3.5',
      '[&_ul]:pl-2',
      '[&_ul]:border-l',
      '[&_ul]:border-gray-500/20'
    ),
    item: cn(
      'item',
      'flex',
      'items-center',
      'justify-start',
      'gap-2',
      'p-2',
      'rounded-shape',
      'cursor-pointer',
      'select-none',
      // icon
      '[&_svg]:size-4',
      '[&_svg]:shrink-0',
      '[&_svg]:transition-transform',
      '[&_svg]:duration-100',
      'data-[state="open"]:[&_svg]:rotate-90',
      // highlight
      'transition-[background-color]',
      'duration-200',
      'not-active:delay-100',
      '[@media(hover:none)]:active:bg-highlight'
    ),
  },
};

export default treeClasses;
