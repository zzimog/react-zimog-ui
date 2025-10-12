import { useState } from 'react';
import { Interaction } from '@ui';

import { Highlight } from './Highlight';

const items = [
  {
    value: 'lorem',
    label: '1. Lorem ipsum dolor',
  },
  {
    value: 'sit',
    label: '2. Sit',
  },
  {
    value: 'amet',
    label: '3. Amet consectetur adipisicing elit',
  },
];

const App = () => {
  const initValue = '';

  const [value, setValue] = useState<string>(initValue);
  const [rect, setRect] = useState<DOMRect>();
  const [interact, setInteract] = useState(false);

  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-200">
      <Interaction type="hover" onRectChange={setRect}>
        <div
          className="group relative"
          onMouseOver={() => setInteract(true)}
          onMouseLeave={() => setInteract(false)}
        >
          <Highlight
            visible={interact && rect !== undefined}
            x={rect?.x}
            y={rect?.y}
            width={rect?.width}
            height={rect?.height}
          />

          <div className="relative z-2 flex gap-4">
            {items.map((item, index) => (
              <Interaction.Node
                key={index}
                defaultSelected={item.value === value}
              >
                <div
                  className="p-4 border"
                  onMouseOver={() => setValue(item.value)}
                >
                  [{item.value}] {item.label}
                </div>
              </Interaction.Node>
            ))}
          </div>
        </div>
      </Interaction>

      <div>Current value: {value}</div>
    </div>
  );
};

export default App;
