const classes = {
  content: [
    'relative z-1',
    'flex',
    'flex-col',
    'gap-2',
    'p-2',
    'outline-none',
  ].join(' '),
  highlight: '',
  item: [
    'flex',
    'items-center',
    'gap-2',
    'p-2',
    'border',
    'outline-none',
    'aria-[disabled=false]:cursor-pointer',
    'aria-[disabled=true]:opacity-50',
    'aria-[disabled=true]:cursor-not-allowed',
  ].join(' '),
  itemCheck: 'size-4',
};

export default classes;
