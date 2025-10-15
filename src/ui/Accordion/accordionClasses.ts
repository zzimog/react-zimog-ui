const accordionClasses = {
  root: 'relative flex flex-col gap-2',
  highlight: 'w-full',
  divider: 'h-px bg-gray-500/20',
  item: {
    root: 'group relative z-10',
    trigger: 'w-full flex justify-between items-center p-3',
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
