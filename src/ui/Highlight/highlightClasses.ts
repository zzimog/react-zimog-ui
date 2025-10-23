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
      'duration-200',
    ],
    {
      variants: {
        hover: {
          true: '[@media(hover:none)]:hidden',
          false: null,
        },
        persistent: {
          true: null,
          false: [
            'animate-duration-300',
            'data-[state="visible"]:with-fade-in',
            'data-[state="hidden"]:with-fade-out',
          ],
        },
      },
      defaultVariants: {
        hover: false,
        persistent: false,
      },
    }
  ),
  item: cva(['relative', 'z-1'], {
    variants: {
      hover: {
        true: '',
        false: null,
      },
    },
    defaultVariants: {
      hover: false,
    },
  }),
};

export default highlightClasses;
