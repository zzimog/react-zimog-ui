import { cn } from '@ui';

const classes = {
  root: 'flex flex-col gap-2',
  input: 'pr-8',
  inputGroup: 'relative',
  toggle: cn(
    'rounded-shape',
    'text-muted',
    'cursor-pointer',
    'hover:text-foreground',
    'focusable',
    'focus-visible:outline-outline',
    '[&>svg]:size-4'
  ),
  requirement: cn(
    'flex',
    'items-center',
    'text-xs',
    '[&>svg]:size-4',
    '[&>svg]:mr-1',
    'data-[state=invalid]:text-muted',
    'data-[state=valid]:[&>svg]:text-green-400',
    'data-[state=invalid]:[&>svg]:text-red-400'
  ),
};

export default classes;
