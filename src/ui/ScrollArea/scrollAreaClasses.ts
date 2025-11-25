import { cva } from 'class-variance-authority';

const scrollAreaClasses = {
  root: 'group/scrollarea relative overflow-hidden',
  viewport:
    'size-full overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden',
  scrollbar: cva(
    'absolute transition opacity-0 group-hover/scrollarea:opacity-75 hover:bg-border hover:opacity-100',
    {
      variants: {
        direction: {
          vertical: 'inset-[0_0_0_auto]',
          horizontal: 'inset-[auto_0_0]',
        },
      },
    }
  ),
  thumb: cva('rounded-full bg-foreground/50 dark:bg-background/50', {
    variants: {
      direction: {
        vertical: 'w-2 h-(--size) translate-y-(--scroll)',
        horizontal: 'w-(--size) h-2 translate-x-(--scroll)',
      },
    },
  }),
};

export default scrollAreaClasses;
