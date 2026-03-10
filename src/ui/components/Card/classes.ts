const classes = {
  root: [
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
    'flex',
    'flex-col',
    'gap-3',
    'px-6',
    'transition',
    '[.border-b]:pb-6',
  ],
  title: 'font-semibold text-lg/none',
  description: 'text-muted',
  content: 'px-6 transition [.border-b]:pb-6',
  footer: [
    'px-6',
    'border-t',
    'text-sm',
    'text-muted',
    'transition',
    '[.border-t]:pt-6',
  ],
};

export default classes;
