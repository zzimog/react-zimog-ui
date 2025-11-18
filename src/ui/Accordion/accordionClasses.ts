import { cn } from '../utils';

const accordionClasses = {
  root: 'w-full',
  highlight: 'w-full translate-x-0',
  item: cn(
    'w-full',
    'border-border',
    'not-first:pt-1',
    'not-last:pb-1',
    'not-last:border-b'
  ),
  trigger: cn(
    'w-full',
    'flex',
    'justify-between',
    'items-center',
    'p-2',
    'rounded-shape',
    'focusable',
    'focus-visible:focus',
    'cursor-pointer',
    'transition-all',
    'hover:bg-highlight',
    'not-hover:delay-100',
    'data-[expanded="true"]:bg-highlight',
    'data-[expanded="false"]:not-hover:text-muted',
    'data-[expanded="true"]:[&_svg]:-scale-y-100'
  ),
  arrow: 'size-4 transition-[scale] duration-200',
  content: 'p-2',
};

export default accordionClasses;
