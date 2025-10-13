import { useRef, useState } from 'react';
import { cn, Interaction } from '@ui';

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
  const [value, setValue] = useState<string>('');
  const ref = useRef<HTMLElement>(null);

  function handleRectChange(rect?: DOMRect) {
    const node = ref.current;
    if (node && rect) {
      const { x, y, width, height } = rect;

      Object.assign(node.style, {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${x}px, ${y}px)`,
      });
    }
  }

  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-200">
      <Interaction type="hover" onRectChange={handleRectChange}>
        <div className="relative" onMouseLeave={() => setValue('')}>
          <Highlight
            ref={ref}
            visible={Boolean(value)}
            className={cn([
              'data-[visible="false"]:animate-fade-out',
              'data-[visible="true"]:animate-fade-in',
            ])}
          />

          <div className="relative z-2 flex gap-4">
            {items.map((item, index) => (
              <Interaction.Node
                key={index}
                defaultSelected={item.value === value}
              >
                <div className="p-4" onMouseOver={() => setValue(item.value)}>
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
