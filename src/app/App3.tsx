import { useState } from 'react';
import { cn, Motion, usePresence } from '@ui';

const vals = [
  { id: 'lorem', label: 'Lorem ipsum dolor', className: '' },
  { id: 'sit', label: 'Sit', className: 'ml-auto' },
  { id: 'amet', label: 'Amet consectetur', className: 'mx-auto' },
];

const Highlight = (inProps: { visible?: boolean }) => {
  const { visible = false } = inProps;

  const { ref, present } = usePresence(visible);

  return (
    <Motion
      ref={ref}
      layoutId="motion-demo"
      data-state={visible ? 'visible' : 'hidden'}
      className={cn(
        'rounded-shape',
        'bg-highlight',
        'data-[state="visible"]:animate-fade-in',
        'data-[state="hidden"]:animate-fade-out'
      )}
      hidden={!present}
    />
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
          {id === value && <Highlight visible={value !== null} />}
          {label}
        </div>
      ))}
    </div>
  );
};

export default App;
