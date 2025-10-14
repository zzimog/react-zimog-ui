import { type ReactNode, useState } from 'react';
import { Collapsible } from '@ui';

const Accordion = (props: { children?: ReactNode }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-100 p-2 border">
      <button className="cursor-pointer" onClick={() => setOpen(!open)}>
        Toggle
      </button>
      <Collapsible open={open}>
        <div className="border p-2">{props.children}</div>
      </Collapsible>
    </div>
  );
};

const App = () => {
  return (
    <Accordion>
      Outer:
      <br />
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum voluptate
      perferendis repellendus, magni laborum atque, iure tempora ipsum nulla
      sint voluptatum distinctio molestias sunt, libero iusto obcaecati aliquam?
      Necessitatibus, assumenda!
      <Accordion>
        Inner:
        <br />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos voluptate
        ab possimus quia qui tempora tempore! Nostrum deserunt ipsa sit?
        Consectetur eos dolor iste quibusdam aperiam voluptatem, veritatis sit
        minima.
      </Accordion>
    </Accordion>
  );
};

export default App;
