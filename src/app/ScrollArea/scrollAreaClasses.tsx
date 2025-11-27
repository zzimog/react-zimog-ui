import { cva } from 'class-variance-authority';

const classes = {
  root: 'group/scrollarea relative',
  viewport: [
    'size-full',
    'overflow-scroll',
    '[scrollbar-width:none]',
    '[-ms-overflow-style:none]',
    '[-webkit-overflow-scrolling:touch]',
    '[&::-webkit-scrollbar]:hidden',
  ].join(' '),
  scrollbar: cva(
    [
      'absolute',
      'transition',
      'opacity-0',
      'group-hover/scrollarea:opacity-75',
      'bg-border/50',
    ],
    {
      variants: {
        direction: {
          vertical: 'w-2 inset-[0_0_calc(var(--spacing)*2)_auto]',
          horizontal: 'h-2 inset-[auto_calc(var(--spacing)*2)_0_0]',
        },
      },
    }
  ),
  thumb: cva(
    [
      'rounded-full',
      'transition-colors',
      'bg-foreground/25',
      'hover:bg-foreground',
      'dark:bg-background/25',
      'dark:hover:bg-background',
    ],
    {
      variants: {
        direction: {
          vertical: 'w-full h-(--size) translate-y-(--scroll)',
          horizontal: 'w-(--size) h-full translate-x-(--scroll)',
        },
      },
    }
  ),
  corner: [
    'size-2',
    'absolute',
    'right-0',
    'bottom-0',
    'transition',
    'opacity-0',
    'group-hover/scrollarea:opacity-75',
    'bg-border/50',
  ].join(' '),
};

export default classes;
