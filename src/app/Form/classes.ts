const classes = {
  root: 'flex flex-col gap-2',
  label: 'w-fit text-sm font-semibold select-none',
  description: [
    'text-sm',
    'text-muted',
    '[&_a]:text-foreground',
    '[&_a]:underline',
  ].join(' '),
};

export default classes;
