import { cva } from 'class-variance-authority';

const collapsibleClasses = cva(['overflow-hidden', 'animate-duration-300'], {
  variants: {
    dir: {
      vertical: [
        'data-[open="true"]:with-height-grow',
        'data-[open="false"]:with-height-shrink',
      ],
      horizontal: [
        'data-[open="true"]:with-width-grow',
        'data-[open="false"]:with-width-shrink',
      ],
    },
  },
  defaultVariants: {
    dir: 'vertical',
  },
});

export default collapsibleClasses;
