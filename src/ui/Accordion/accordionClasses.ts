const classes = {
  root: 'text-foreground',
  item: 'border-foreground not-last:border-b',
  trigger: [
    'w-full',
    'flex',
    'justify-between',
    'items-center',
    'gap-2',
    'py-4',
    'font-semibold',
    'hover:underline',
    '[&_svg]:size-4',
    '[&_svg]:transition-transform',
    'data-[open=true]:[&_svg]:-rotate-180',
  ].join(' '),
  collapsible: [
    'overflow-hidden',
    'data-[visible=true]:animate-height-grow',
    'data-[visible=false]:animate-height-shrink',
  ].join(' '),
  content: 'pb-4',
};

export default classes;
