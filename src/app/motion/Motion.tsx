import { useEffect, useLayoutEffect, useRef, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import { animationLoop } from './animation-loop';

type MotionStorageData = {
  node: HTMLElement;
  rect: DOMRect;
};

const MotionStorage = new Map<string, MotionStorageData>();

type MotionProps = {
  id: string;
} & HTMLAttributes<HTMLDivElement>;

export const Motion = (inProps: MotionProps) => {
  const { id, style, className, ...props } = inProps;

  const ref = useRef<HTMLDivElement>(null);

  const data = MotionStorage.get(id);
  const prevRectRef = useRef(data?.rect);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      Object.assign(node.style, {
        width: null,
        height: null,
        transform: null,
        transitionDuration: null,
        ...style,
      });

      return () => {
        const data = MotionStorage.get(id);
        if (node === data?.node) {
          MotionStorage.delete(id);
        }
      };
    }
  });

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      const prev = prevRectRef.current;

      const stop = animationLoop(() => {
        const rect = node.getBoundingClientRect();
        MotionStorage.set(id, { node, rect });

        if (!prev) {
          stop();
        }
      });

      if (prev) {
        const rect = node.getBoundingClientRect();

        const x = prev.x - rect.x;
        const y = prev.y - rect.y;

        Object.assign(node.style, {
          width: `${prev.width}px`,
          height: `${prev.height}px`,
          transform: `translate(${x}px, ${y}px)`,
          transitionDuration: '0s',
        });
      }

      node.addEventListener('transitioncancel', stop);
      node.addEventListener('transitionend', stop);

      return () => {
        stop();
        node.addEventListener('transitioncancel', stop);
        node.removeEventListener('transitionend', stop);
      };
    }
  });

  return (
    <div
      ref={ref}
      style={style}
      className={clsx(
        'absolute',
        'top-0',
        'left-0',
        'size-full',
        'mix-blend-multiply',
        'bg-red-500',
        'transition-all',
        'duration-200',
        'ease-linear',
        className
      )}
      {...props}
    />
  );
};
