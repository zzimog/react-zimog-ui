import { cn } from '@ui';
import { useState } from 'react';
import { Motion } from './motion/Motion';

const vals = [
  { id: 'lorem', label: 'Lorem ipsum dolor', className: '' },
  { id: 'sit', label: 'Sit', className: 'ml-auto' },
  { id: 'amet', label: 'Amet consectetur', className: 'mx-auto' },
];

const App = () => {
  const [value, setValue] = useState<string | null>(vals[0].id);

  return (
    <div
      className="w-200 flex flex-col gap-4 p-4 border"
      onMouseLeave={() => setValue(null)}
    >
      {vals.map(({ id, label, className }, index) => (
        <div
          key={index}
          className={cn(
            'relative w-fit p-4 border border-black',
            id === value && 'border-red-500',
            className
          )}
          onMouseOver={() => setValue(id)}
        >
          {id === value && <Motion id="bubble" />}
          {label}
        </div>
      ))}
    </div>
  );
};

export default App;
