import { cn } from '../utils';

const accordionClasses = {
  root: cn(['p-1', 'rounded-md', 'bg-gray-500/10']),
  item: {
    root: 'group',
    trigger: cn(['w-full', 'justify-between', 'not-disabled:active:scale-100']),
    arrow: cn([
      'size-4',
      'pointer-events-none',
      'shrink-0',
      'transition-transform',
      'duration-200',
      'group-[[data-state="open"]]:rotate-180',
    ]),
    content: 'p-2',
  },
};

export default accordionClasses;
