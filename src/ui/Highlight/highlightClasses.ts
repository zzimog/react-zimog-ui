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
            'data-[state="visible"]:animate-in',
            'data-[state="hidden"]:animate-out',
            'data-[state="hidden"]:animation-delay-200',
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
          'transition',
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
