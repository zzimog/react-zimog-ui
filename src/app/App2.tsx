import { MoreVertical } from 'lucide-react';
import { Card, Popover } from '@ui';

const PopoverTest = ({ className }: any) => {
  return (
    <Popover defaultOpen>
      <Popover.Trigger
        aria-label="Open layer"
        title="Open layer"
        className={[
          className,
          'absolute',
          'p-2',
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
      <Popover.Content className="flex w-80">
        <Card tabIndex={-1} className="overflow-auto" opticalCorrection="both">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo optio
          cum dolorem porro hic impedit rem error, facilis recusandae, amet
          dolores cumque modi debitis exercitationem. Iure nemo perspiciatis
          molestiae perferendis!
        </Card>
      </Popover.Content>
    </Popover>
  );
};

const App = () => {
  return (
    <>
      <PopoverTest className="top-8 left-8" />
      <PopoverTest className="top-8 left-1/2 -translate-x-1/2" />
      <PopoverTest className="top-8 right-8" />
    </>
  );
};

export default App;
