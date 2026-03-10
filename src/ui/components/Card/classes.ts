const classes = {
  root: [
    'flex',
    'flex-col',
    'gap-6',
    'py-6',
    'border',
    'rounded-shape',
    'text-card-contrast',
    'bg-card',
    'overflow-hidden',
    'transition-colors',
  ],
  header: [
    'flex',
    'flex-col',
    'gap-3',
    'px-6',
    'transition-colors',
    '[.border-b]:pb-6',
  ],
  title: 'font-semibold text-lg/none',
  description: 'text-muted',
  content: 'px-6 [.border-b]:pb-6 transition-colors',
  footer: [
    'flex',
    'flex-col',
    'items-center',
    'gap-2',
    'p-6',
    'border-t',
    'text-sm',
    'text-muted',
    'transition-colors',
  ],
};

export default classes;
