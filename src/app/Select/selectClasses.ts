import { cn } from '@ui';
import { cva } from 'class-variance-authority';

const selectClasses = {
  trigger: cn(
    'flex',
    'justify-between',
    'items-center',
    'h-10',
    'px-3 py-2',
    'border',
    'text-sm',
    'border-border',
    'bg-white',
    'dark:bg-zinc-800',
    'rounded-shape',
    'cursor-pointer',
    'select-none',
    'focusable',
    'focus-visible:outline-outline',
    'focus-visible:border-primary',
    'hover:border-primary',
    'transition-colors'
  ),
  arrow: 'size-4',
  content: cn(
    'w-(--width)',
    'max-h-[min(var(--max-height),calc(var(--spacing)*64))]',
    'p-1',
    'border',
    'text-sm',
    'rounded-shape',
    'overflow-auto',
    'transition-colors',
    'focusable',
    'border-border',
    'focus-within:outline-outline',
    'focus-within:border-primary',
    'hover:border-primary',
    'bg-white',
    'dark:bg-zinc-800',
    '[--exit-scale-y:0]',
    '[--enter-scale-y:0]'
  ),
  option: cva(
    [
      'grid',
      'grid-cols-[1fr_calc(var(--spacing)*4)]',
      'items-center',
      'gap-2',
      'px-2 py-1',
      'rounded-shape',
      'outline-0',
      'focus:bg-highlight',
      'cursor-pointer',
      'select-none',
    ],
    {
      variants: {
        disabled: {
          true: 'opacity-50 cursor-not-allowed',
        },
      },
    }
  ),
};

export default selectClasses;
