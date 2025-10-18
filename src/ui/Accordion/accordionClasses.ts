const accordionClasses = {
  root: 'relative',
  highlight: 'w-full',
  item: {
    root: 'group relative z-10 not-first:pt-2 not-last:pb-2 not-last:border-b border-highlight',
    trigger: 'w-full flex justify-between items-center p-3',
    arrow:
      'size-4 shrink-0 transition-transform duration-200 pointer-events-none group-[[data-state="open"]]:rotate-180',
    content: 'p-2',
  },
};

export default accordionClasses;
