const classes = {
  root: [
    'group/card',
    'flex',
    'flex-col',
    'gap-6',
    'py-6',
    'border',
    'rounded-shape',
    'bg-card',
    'text-card-contrast',
    'overflow-hidden',
    'transition',
  ],
  header: [
    'group/header',
    'flex',
    'flex-col',
    'gap-3',
    'px-6',
    'transition',
    '[.border-b]:pb-6',
  ],
  title: 'font-semibold text-lg/none',
  description: 'text-muted',
  content: 'group/content px-6 transition [.border-b]:pb-6',
  footer: [
    'p-6',
    'border-t',
    'text-sm',
    'text-muted',
    'bg-muted-background/50',
    'transition',
    '[.border-t]:pt-6',
    'last:-mb-6',
  ],
};

export default classes;
