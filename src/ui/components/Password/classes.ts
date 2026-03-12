import { cn } from '@ui';

const classes = {
  root: 'flex flex-col gap-2 [&_svg]:size-4',
  input: 'pr-8',
  inputGroup: 'relative',
  toggle: cn(
    'rounded-shape',
    'text-muted',
    'cursor-pointer',
    'focusable',
    'focus-visible:outline-outline',
    'hover:text-foreground'
  ),
  requirement: cn(
    'flex',
    'items-center',
    'text-sm',
    '[&>svg]:mr-1',
    'data-[valid=false]:text-muted',
    'data-[valid=false]:[&>svg]:text-red-400',
    'data-[valid=true]:[&>svg]:text-green-400'
  ),
};

export default classes;
