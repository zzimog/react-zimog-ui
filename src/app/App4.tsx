import { useState } from 'react';
import { Accordion } from './accordion';

const App = () => {
  const [value, setValue] = useState('');

  return (
    <Accordion value={value} onValueChange={setValue}>
      <Accordion.Item value="foo" className="w-80">
        <Accordion.Trigger className="w-full p-2 border cursor-pointer">
          Foo
        </Accordion.Trigger>
        <Accordion.Content className="border">
          <div className="p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
            vitae ratione! Quis veritatis explicabo adipisci maiores optio
            voluptas iste amet non nesciunt soluta impedit, hic aspernatur,
            voluptatem porro eveniet vitae.
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="bar" className="w-80">
        <Accordion.Trigger className="w-full p-2 border cursor-pointer">
          Bar
        </Accordion.Trigger>
        <Accordion.Content className="border">
          <div className="p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
            vitae ratione! Quis veritatis explicabo adipisci maiores optio
            voluptas iste amet non nesciunt soluta impedit, hic aspernatur,
            voluptatem porro eveniet vitae.
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default App;
