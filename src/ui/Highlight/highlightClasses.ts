import { cva } from 'class-variance-authority';

const highlightClasses = cva(
  [
    'absolute',
    'z-0',
    'rounded-shape',
    'transition-all',
    'bg-highlight',
    'duration-200',
    'animate-duration-300',
    'ease-linear',
  ],
  {
    variants: {
      persistent: {
        true: null,
        false: [
          'data-[state="visible"]:with-fade-in',
          'data-[state="hidden"]:with-fade-out',
        ],
      },
    },
    defaultVariants: {
      persistent: false,
    },
  }
);

export default highlightClasses;
