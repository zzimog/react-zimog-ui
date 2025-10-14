import { cva } from 'class-variance-authority';

const highlightClasses = cva(
  ['absolute', 'z-1', 'rounded-md', 'bg-gray-500/15', 'transition-all'],
  {
    variants: {
      persistent: {
        true: null,
        false: [
          'data-[state="visible"]:animate-fade-in',
          'data-[state="hidden"]:animate-fade-out',
        ],
      },
    },
    defaultVariants: {
      persistent: false,
    },
  }
);

export default highlightClasses;
