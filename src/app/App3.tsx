import { useLayoutEffect, useRef, useState } from 'react';
import { cn, Motion, usePresence } from '@ui';

const vals = [
  { id: 'lorem', label: 'Lorem ipsum dolor', className: '' },
  { id: 'sit', label: 'Sit', className: 'ml-auto' },
  { id: 'amet', label: 'Amet consectetur', className: 'mx-auto' },
];

const Highlight = (inProps: { selected?: boolean; value: string | null }) => {
  const { selected = false, value } = inProps;
  const prevSelectedRef = useRef(selected);
  const prevValueRef = useRef(value);

  useLayoutEffect(() => {
    prevSelectedRef.current = selected;
  }, [selected]);

  useLayoutEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  /**
   * if selected and prev value is null
   * - fade in
   *
   * if selected and prev value not null
   * - no animation
   *
   * if prev selected and value is null
   * - fade out
   *
   * if prev selected and value is not null
   * - no animation
   */

  const prevValue = prevValueRef.current;
  const shouldAnimate = prevValue === null || value === null;

  return <HighlightItem visible={selected} animate={shouldAnimate} />;
};

const HighlightItem = (inProps: { visible?: boolean; animate?: boolean }) => {
  const { visible = false, animate = true } = inProps;

  const { ref, present } = usePresence(visible);

  const shouldRender = visible || present;

  return (
    shouldRender && (
      <Motion
        ref={ref}
        data-state={visible ? 'visible' : 'hidden'}
        layoutId="motion-demo"
        className={cn(
          'rounded-shape',
          'bg-highlight',
          'bg-red-500',
          'mix-blend-multiply',
          animate && [
            'data-[state="visible"]:animate-fade-in',
            'data-[state="hidden"]:animate-fade-out',
          ],
          'duration-5000'
        )}
        style={{ animationDuration: '5s' }}
      />
    )
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
          <Highlight selected={id === value} value={value} />
          {label}
        </div>
      ))}
    </div>
  );
};

export default App;
