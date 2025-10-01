import buttonClasses from '../Button/buttonClasses';

const tabsClasses = {
  root: 'flex flex-col',
  list: {
    root: 'relative flex border-b border-neutral-500/25',
    indicator: [
      'h-[2px]',
      '-mt-px',
      'bg-primary',
      'transition-[width,transform]',
      'duration-200',
    ].join(' '),
  },
  trigger: [
    buttonClasses({ variant: 'ghost' }),
    'p-2',
    'rounded-none',
    'scale-100!',
    'hover:bg-transparent',
  ].join(' '),
  content: 'p-2',
};

export default tabsClasses;
