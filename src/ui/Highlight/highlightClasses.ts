import { cva } from 'class-variance-authority';

const highlightClasses = cva(
  ['absolute', 'z-1', 'rounded-md', 'bg-gray-500/15', 'transition-all'],
  {
    variants: {
      persistent: {
        true: null,
        false: [
          'data-[visible="false"]:animate-fade-out',
          'data-[visible="true"]:animate-fade-in',
        ],
      },
    },
    defaultVariants: {
      persistent: false,
    },
  }
);

export default highlightClasses;
