import { cva } from 'class-variance-authority';

const scrollbarCommon = [
  'absolute',
  'bg-border',
  'transition',
  'outline-0',
  'opacity-0',
  'group-hover:opacity-100',
];

const classes = {
  root: 'group relative',
  viewport: [
    'size-full',
    'overflow-scroll',
    'outline-0',
    '[scrollbar-width:none]',
    '[-ms-overflow-style:none]',
    '[-webkit-overflow-scrolling:touch]',
    '[&::-webkit-scrollbar]:hidden',
  ].join(' '),
  scrollbar: cva(scrollbarCommon, {
    variants: {
      direction: {
        vertical: 'w-2 inset-[0_0_calc(var(--spacing)*2)_auto]',
        horizontal: 'h-2 inset-[auto_calc(var(--spacing)*2)_0_0]',
      },
    },
  }),
  thumb: cva(
    [
      'rounded-full',
      'transition-opacity',
      'opacity-50',
      'hover:opacity-100',
      'bg-foreground',
      'dark:bg-background',
    ],
    {
      variants: {
        direction: {
          vertical: 'w-full h-(--thumb-size) translate-y-(--scroll)',
          horizontal: 'w-(--thumb-size) h-full translate-x-(--scroll)',
        },
      },
    }
  ),
  corner: [...scrollbarCommon, 'right-0', 'bottom-0', 'size-2'].join(' '),
};

export default classes;
