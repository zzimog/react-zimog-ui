import { cva } from 'class-variance-authority';

const classes = {
  root: '',
  scrollbar: {
    root: cva('bg-red-500', {
      variants: {
        direction: {
          vertical: 'w-4',
          horizontal: 'h-4',
        },
      },
    }),
    thumb: cva('bg-blue-500', {
      variants: {
        direction: {
          vertical: 'w-full h-8 translate-y-(--scroll)',
          horizontal: 'w-8 h-full translate-x-(--scroll)',
        },
      },
    }),
    corner: '',
  },
};

export default classes;
