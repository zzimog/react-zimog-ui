import { Button } from '@ui';
import { DemoBox } from './DemoBox';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

function usePopper() {
  const triggerRef = useRef<HTMLElement>(null);
  const [rect, setRect] = useState<DOMRect>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!triggerRef.current) {
      return;
    }

    const trigger = triggerRef.current;
    const rect = trigger.getBoundingClientRect();
    setRect(rect);

    function handleClick() {
      setVisible((v) => !v);
    }

    trigger.addEventListener('click', handleClick);

    return () => {
      trigger.removeEventListener('click', handleClick);
    };
  }, []);

  const PopperLayer = (props: { children: ReactNode }) => {
    if (!rect || !visible) {
      return null;
    }

    return createPortal(
      <div
        className="fixed bg-white border border-red-500"
        style={{ top: rect.bottom, left: rect.left }}
      >
        {props.children}
      </div>,
      document.body
    );
  };

  return {
    triggerRef,
    PopperLayer,
  };
}

// eslint-disable-next-line react-refresh/only-export-components
const Dropdown = () => {
  const { triggerRef, PopperLayer } = usePopper();

  return (
    <DemoBox id="dropdown" title="Dropdown" center>
      <Button ref={triggerRef}>Pop</Button>
      <PopperLayer>Hello world!</PopperLayer>
    </DemoBox>
  );
};

export default <Dropdown />;
