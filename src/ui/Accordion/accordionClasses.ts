import { cn } from '../utils';

const accordionClasses = {
  root: '',
  highlight: 'w-full translate-x-0',
  item: {
    root: cn(
      'group',
      'not-first:pt-2',
      'not-last:pb-2',
      'not-last:border-b',
      'border-highlight'
    ),
    trigger: cn(
      'w-full',
      'flex',
      'justify-between',
      'items-center',
      'p-3',
      'cursor-pointer',
      'transition-colors',
      'data-[expanded="false"]:not-hover:text-muted',
      'data-[expanded="true"]:[&_svg]:-scale-y-100'
    ),
    arrow: cn(
      'size-4',
      'shrink-0',
      'transition-transform',
      'duration-200',
      'pointer-events-none'
    ),
    content: 'p-2',
  },
};

export default accordionClasses;
