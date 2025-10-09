const accordionClasses = {
  root: 'p-1 rounded-md bg-gray-500/10',
  item: {
    root: 'group',
    trigger: [
      'flex',
      'justify-between',
      'items-center',
      'w-full',
      'not-disabled:active:scale-100',
    ].join(' '),
    arrow: [
      'size-4',
      'shrink-0',
      'transition-transform',
      'duration-200',
      'pointer-events-none',
      'group-[[data-state="open"]]:rotate-180',
    ].join(' '),
    content: 'p-2',
  },
};

export default accordionClasses;
