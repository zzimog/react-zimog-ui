import { cva } from 'class-variance-authority';

const highlightClasses = {
  root: 'relative',
  indicator: cva(
    [
      'absolute',
      'z-0',
      'w-(--width)',
      'h-(--height)',
      'translate-x-(--x)',
      'translate-y-(--y)',
      'rounded-shape',
      'bg-highlight',
      'transition-all',
      'duration-200',
      'ease-linear',
    ],
    {
      variants: {
        hover: {
          true: '[@media(hover:none)]:hidden',
        },
        persistent: {
          false: [
            'animate-duration-300',
            'data-[state="visible"]:with-fade-in',
            'data-[state="hidden"]:with-fade-out',
            'data-[state="hidden"]:animate-delay-200',
          ],
        },
      },
      defaultVariants: {
        hover: false,
        persistent: false,
      },
    }
  ),
  item: cva(['relative', 'z-1', 'rounded-shape'], {
    variants: {
      hover: {
        true: [
          'transition-[background-color]',
          'duration-200',
          'not-active:delay-100',
          '[@media(hover:none)]:active:bg-highlight',
        ],
      },
    },
    defaultVariants: {
      hover: false,
    },
  }),
};

export default highlightClasses;
