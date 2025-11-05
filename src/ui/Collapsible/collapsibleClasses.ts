import { cva } from 'class-variance-authority';

const collapsibleClasses = cva(['overflow-hidden', 'animate-duration-300'], {
  variants: {
    dir: {
      vertical: [
        'data-[open="true"]:animate-height-grow',
        'data-[open="false"]:animate-height-shrink',
      ],
      horizontal: [
        'data-[open="true"]:animate-width-grow',
        'data-[open="false"]:animate-width-shrink',
      ],
    },
  },
  defaultVariants: {
    dir: 'vertical',
  },
});

export default collapsibleClasses;
