import { type ReactNode, useState } from 'react';
import { Collapsible } from '@ui';

const Accordion = (props: { children?: ReactNode }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-100 p-2 border">
      <button
        className="w-full p-1 text-white bg-black cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Toggle
      </button>
      <Collapsible open={open}>
        <div
          style={{ padding: '16px', lineHeight: '24px', fontFamily: 'Arial' }}
        >
          {props.children}
        </div>
      </Collapsible>
    </div>
  );
};

const App = () => {
  return (
    <div className="h-100">
      <Accordion>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
        voluptate perferendis repellendus, magni laborum atque, iure tempora
        ipsum nulla sint voluptatum distinctio molestias sunt, libero iusto
        obcaecati aliquam? Necessitatibus, assumenda!
      </Accordion>
    </div>
  );
};

export default App;
