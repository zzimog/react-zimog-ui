import { cn } from '../utils';
import buttonClasses from '../Button/buttonClasses';

const tabsClasses = {
  root: 'flex flex-col',
  list: {
    root: 'border-b border-neutral-500/25',
    tabs: 'flex gap-4',
    indicator: cn([
      'h-[2px]',
      'bg-primary',
      'transition-[width,transform]',
      'duration-200',
    ]),
  },
  trigger: cn([
    buttonClasses({ variant: 'ghost' }),
    'scale-100!',
    'hover:bg-transparent',
  ]),
  content: 'p-2',
};

export default tabsClasses;
