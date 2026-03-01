const classes = {
  root: [
    'border',
    'rounded-shape',
    'text-foreground',
    'bg-background',
    'transition-colors',
    'overflow-hidden',
  ],
  header: 'flex flex-col gap-2 p-6 border-b transition-colors',
  title: 'font-bold text-lg/none',
  description: 'text-sm transition-colors text-muted',
  content: 'p-6 transition-colors not-last:border-b',
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
