/* eslint-disable react-refresh/only-export-components */
import { type CSSProperties, useRef, useState } from 'react';
import { Interactive } from '@ui';
import { DemoBox } from './DemoBox';

const DemoInteractive = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  function handleInteraction(item: HTMLElement) {
    const parentRect = ref.current!.getBoundingClientRect();
    const { left, width } = item.getBoundingClientRect();
    const leftOffset = left - parentRect.left;

    setStyle((prev) => ({
      ...prev,
      width: `${width}px`,
      transform: `translateX(${leftOffset}px)`,
    }));
  }

  return (
    <DemoBox id="interactive" title="Interactive" center>
      <div
        ref={ref}
        className={[
          'group',
          'relative',
          'flex',
          'gap-2',
          '[&_*]:p-2',
          '[&_*]:z-1',
          '[&_*]:cursor-pointer',
        ].join(' ')}
      >
        <div
          className={[
            'absolute',
            'h-full',
            'rounded-md',
            'bg-gray-500/15',
            'transition-[width,transform,opacity]',
            'duration-200',
            'z-0',
            'opacity-0',
            'group-has-hover:opacity-100',
          ].join(' ')}
          style={style}
        />
        <Interactive type="hover" onInteraction={handleInteraction}>
          <div>Lorem</div>
          <div>Ipsum</div>
          <div>Dolor</div>
        </Interactive>
      </div>
    </DemoBox>
  );
};

export default <DemoInteractive />;
