const classes = {
  root: [
    'flex',
    'flex-col',
    'p-1',
    'border',
    'bg-card',
    'rounded-shape-1',
    'transition',
  ],
  label: 'text-muted px-2 py-1 text-xs font-extrabold',
  separator: 'w-full h-px my-1 bg-border',
  item: [
    'relative',
    'flex',
    'gap-2',
    'justify-between',
    'items-center',
    'w-full',
    'p-2',
    'pl-8',
    'text-left',
    'text-xs/4',
    'rounded-shape',
    'outline-0',
    'focus:bg-highlight',
    '[&_svg]:size-4',
  ],
  icon: 'absolute left-2',
};

export default classes;
