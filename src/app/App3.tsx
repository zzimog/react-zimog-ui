import { type ReactNode, useState, useRef, memo } from 'react';
import { Interaction } from '../ui/Interaction';

const App = () => {
  const [mounted, setMounted] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  function handleHighlight(rect?: DOMRect) {
    const node = ref.current;

    if (node) {
      if (rect) {
        const { top, left, width, height } = rect;

        Object.assign(node.style, {
          visibility: 'visible',
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`,
          height: `${height}px`,
        });
      } else {
        node.style.visibility = 'hidden';
      }
    }
  }

  const Item = memo((props: { selected?: boolean; children: ReactNode }) => (
    <Interaction.Node defaultSelected={props.selected}>
      <div className="relative z-10 p-2">{props.children}</div>
    </Interaction.Node>
  ));

  return (
    <div className="h-60 flex flex-col gap-2 p-2 bg-gray-200">
      <a href="#!" onClick={() => setMounted(!mounted)}>
        Toggle
      </a>

      {mounted && (
        <Interaction type="hover" onRectChange={handleHighlight}>
          <div className="relative">
            <div ref={ref} className="absolute bg-red-500 z-0 transition-all" />
            <div className="flex gap-4">
              <Item>1. Lorem ipsum dolor</Item>
              <Item selected>2. Sit</Item>
              <Item>3. Amet consectetur adipisicing elit</Item>
            </div>
          </div>
        </Interaction>
      )}
    </div>
  );
};

export default App;
