import { MoreVertical } from 'lucide-react';
import { Popover } from '@ui';

const App = () => {
  return (
    <Popover open>
      <Popover.Trigger
        className={[
          'p-1',
          'rounded-shape',
          'transition-colors',
          'duration-300',
          'cursor-pointer',
          'border',
          //light
          'text-zinc-800',
          'border-zinc-200',
          'hover:bg-zinc-100',
          'data-[open="true"]:bg-zinc-100',
          // dark
          'dark:text-zinc-200',
          'dark:border-zinc-800',
          'dark:hover:bg-zinc-900',
          'dark:data-[open="true"]:bg-zinc-900',
        ].join(' ')}
      >
        <MoreVertical className="size-4" />
      </Popover.Trigger>
      <Popover.Content
        className={[
          'flex',
          'w-80',
          'rounded-shape',
          'border',
          'overflow-hidden',
          // focus
          'focusable',
          'focus:focus',
          // light
          'border-zinc-200',
          'bg-zinc-100',
          // dark
          'dark:border-zinc-800',
          'dark:bg-zinc-900',
        ].join(' ')}
      >
        <div className="px-4 pt-2.5 pb-3 overflow-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iure
          et, deleniti repudiandae perspiciatis ducimus! Quos voluptates dicta
          deserunt, nesciunt numquam suscipit neque impedit? Asperiores quasi
          cupiditate animi commodi!
        </div>
      </Popover.Content>
    </Popover>
  );
};

export default App;
