const tabsClasses = {
  root: 'relative flex flex-col',
  list: {
    root: 'border-b border-border',
    tabs: 'relative z-10 flex gap-4 pb-3',
  },
  trigger: [
    'p-2',
    'rounded-md',
    'transition-colors',
    'data-[selected="false"]:not-hover:text-muted',
  ].join(' '),
  content: 'p-2 pt-1.5',
};

export default tabsClasses;
