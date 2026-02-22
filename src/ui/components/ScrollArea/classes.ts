import { cva } from 'class-variance-authority';

const scrollbarCommon = [
  'absolute',
  'bg-border',
  'outline-0',
  'opacity-25',
  'transition-opacity',
  'group-hover/scrollarea:opacity-75',
  'data-[visible=false]:hidden',
];

const classes = {
  root: ['group/scrollarea', 'relative'],
  viewport: [
    'size-full',
    'outline-0',
    'overflow-scroll',
    '[scrollbar-width:none]',
    '[-ms-overflow-style:none]',
    '[-webkit-overflow-scrolling:touch]',
    '[&::-webkit-scrollbar]:hidden',
  ],
  scrollbar: cva(['group/scrollbar', ...scrollbarCommon], {
    variants: {
      useCorner: {
        true: null,
      },
      direction: {
        vertical: 'w-2 inset-[0_0_0_auto]',
        horizontal: 'h-2 inset-[auto_0_0_0]',
      },
    },
    compoundVariants: [
      {
        useCorner: true,
        direction: 'vertical',
        className: 'bottom-2',
      },
      {
        useCorner: true,
        direction: 'horizontal',
        className: 'right-2',
      },
    ],
  }),
  thumb: cva(
    [
      'rounded-full',
      'bg-foreground',
      'opacity-50',
      'transition-opacity',
      'hover:opacity-100',
      'group-hover/scrollbar:opacity-100',
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
  corner: [...scrollbarCommon, 'right-0', 'bottom-0', 'size-2'],
};

export default classes;
