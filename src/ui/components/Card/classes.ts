const classes = {
  root: [
    'flex',
    'flex-col',
    'gap-2',
    'rounded-shape',
    'border',
    'transition-colors',
    'overflow-hidden',
    'text-foreground',
    'bg-background/10',
  ].join(' '),
  header: [
    'flex',
    'flex-col',
    'gap-2',
    'p-6',
    'border-b',
    'border-border',
    'not-first:border-t',
  ].join(' '),
  title: 'font-bold text-lg/none',
  description: ['text-sm', 'transition-colors', 'text-muted'].join(' '),
  content: 'p-6',
  footer: [
    'flex',
    'flex-col',
    'items-center',
    'gap-2',
    'p-6',
    'border-t',
    'text-sm',
    'transition-colors',
    'border-border',
    'text-muted',
  ].join(' '),
};

export default classes;
