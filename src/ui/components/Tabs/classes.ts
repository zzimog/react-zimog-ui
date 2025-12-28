const classes = {
  list: [
    'w-fit',
    'flex',
    'gap-2',
    'p-1',
    'text-sm',
    'border',
    'rounded-shape-1',
    'transition-colors',
    'text-foreground',
    'bg-background',
  ].join(' '),
  highlight: [
    'w-(--width)',
    'h-(--height)',
    'translate-x-(--x)',
    'translate-y-(--y)',
    'bg-highlight',
    'rounded-shape',
    'transition-all',
  ].join(' '),
  trigger: [
    'relative',
    'px-2',
    'py-1',
    'rounded-shape',
    'transition-colors',
    'outline-2',
    'focusable',
    'focus-visible:outline-outline',
  ].join(' '),
};

export default classes;
