import { cva } from 'class-variance-authority';

const collapsibleClasses = cva(['overflow-hidden', 'animate-duration-300'], {
  variants: {
    dir: {
      vertical: [
        'data-[state="open"]:with-height-grow',
        'data-[state="closed"]:with-height-shrink',
      ],
      horizontal: [
        'data-[state="open"]:with-width-grow',
        'data-[state="closed"]:with-width-shrink',
      ],
    },
  },
  defaultVariants: {
    dir: 'vertical',
  },
});

export default collapsibleClasses;
