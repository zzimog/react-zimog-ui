import { useEffect, useRef, useState } from 'react';
import { cn, Motion, usePresence } from '@ui';

const vals = [
  { id: 'lorem', label: 'Lorem ipsum dolor', className: '' },
  { id: 'sit', label: 'Sit', className: 'ml-auto' },
  { id: 'amet', label: 'Amet consectetur', className: 'mx-auto' },
];

const Highlight = (inProps: { visible?: boolean; value: string | null }) => {
  const { visible = false, value } = inProps;

  const prevValueRef = useRef(value);
  const { ref, present } = usePresence(visible);

  const fadeIn = prevValueRef.current === null;
  const fadeOut = value === null;

  const shouldRender = (visible && (fadeIn || fadeOut)) || present;

  useEffect(() => {
    return () => {
      prevValueRef.current = value;
    };
  }, [value]);

  return (
    <>
      <div className="w-50">
        <div>visible: {visible ? 'true' : 'false'}</div>
        <div>present: {present ? 'true' : 'false'}</div>
        <div>fadeIn: {fadeIn ? 'true' : 'false'}</div>
        <div>fadeOut: {fadeOut ? 'true' : 'false'}</div>
      </div>
      {shouldRender && (
        <Motion
          ref={ref}
          layoutId="motion-demo"
          className={cn(
            'rounded-shape',
            'bg-highlight',
            fadeIn && 'animate-fade-in',
            fadeOut && 'animate-fade-out'
          )}
        />
      )}
    </>
  );
};

const App = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div
      className="w-200 flex flex-col gap-4 p-4 border"
      onMouseLeave={() => setValue(null)}
    >
      {vals.map(({ id, label, className }, index) => (
        <div
          key={index}
          className={cn('relative w-fit p-4 cursor-default', className)}
          onMouseOver={() => setValue(id)}
        >
          <Highlight visible={id === value} value={value} />
          {label}
        </div>
      ))}
    </div>
  );
};

export default App;
