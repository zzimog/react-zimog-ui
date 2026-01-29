import { cn } from '@ui/utils';

const classes = {
  trigger: 'flex items-center gap-2 border',
  content: 'w-(--trigger-width) p-2 rounded-shape border',
  option: cn('p-2', 'data-highlighted:bg-red-500'),
};

export default classes;
