import { Button, Collapsible } from '@ui';
import { useState } from 'react';
import { DemoContainer } from './components/demo-container';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <DemoContainer title="Collapsible" code="// Work in progress">
      <div className="w-80">
        <Button onClick={() => setOpen(!open)}>Toggle</Button>
        <Collapsible open={open}>
          <p className="p-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi hic
            laborum consequatur facilis, necessitatibus officiis quia quidem
            reprehenderit aut ipsum tenetur ullam, deleniti error quisquam
            neque, explicabo dolorum iure nobis.
          </p>
        </Collapsible>
      </div>
    </DemoContainer>
  );
};
