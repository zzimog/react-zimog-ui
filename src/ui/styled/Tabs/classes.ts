const classes = {
  root: '',
  list: 'flex gap-2',
  highlight: [
    'w-(--width)',
    'h-(--height)',
    'translate-x-(--x)',
    'translate-y-(--y)',
    'bg-red-500',
    'transition-all',
  ].join(' '),
  trigger: ['relative'].join(' '),
  content: '',
};

export default classes;
