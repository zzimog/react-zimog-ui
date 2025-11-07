import { MoreVertical } from 'lucide-react';
import { Button, Card, Popover } from '@ui';

const PopoverTest = ({ className }: any) => {
  return (
    <Popover defaultOpen>
      <Popover.Trigger asChild>
        <Button
          size="sm"
          variant="outlined"
          aria-label="Open layer"
          title="Open layer"
          className={`absolute ${className}`}
        >
          <MoreVertical className="size-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content align='start'>
        <Card
          tabIndex={-1}
          className="w-80 overflow-auto"
          opticalCorrection="both"
        >
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
      <PopoverTest className="top-200 left-1/2 -translate-x-1/2" />
      <PopoverTest className="top-8 right-8" />
    </>
  );
};

export default App;
