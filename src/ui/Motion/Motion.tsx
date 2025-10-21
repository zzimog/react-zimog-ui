import { useRef, useEffect, useLayoutEffect } from 'react';
import { cn } from '../utils';
import { poly } from '../polymorphic';
import { useMergedRefs } from '../hooks';
import { animationLoop } from './animation-loop';

type MotionStorageData = {
  node: HTMLElement;
  rect: DOMRect;
  style: Record<string, string>;
};

const MotionStorage = new Map<string, MotionStorageData>();

type MotionProps = {
  layoutId: string;
};

export const Motion = poly.div<MotionProps>((Tag, inProps) => {
  const { ref: refProp, layoutId, style, className, ...props } = inProps;

  const ref = useRef<HTMLDivElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const data = MotionStorage.get(layoutId);
  const prevDataRef = useRef(data);
  const prevStyleRef = useRef<Record<string, string>>(null);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const resetStyle: Record<string, null> = {};
      for (const prop in prevStyleRef.current) {
        resetStyle[prop] = null;
      }

      Object.assign(node.style, {
        ...resetStyle,
        ...style,
      });

      return () => {
        const data = MotionStorage.get(layoutId);
        if (node === data?.node) {
          MotionStorage.delete(layoutId);
        }
      };
    }
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      const prev = prevDataRef.current;
      const style = getComputedStyle(node);

      const stop = animationLoop(() => {
        const rect = node.getBoundingClientRect();
        MotionStorage.set(layoutId, {
          node,
          rect,
          style: {
            opacity: style.opacity,
          },
        });

        if (!prev) {
          //stop();
        }
      });

      if (prev && !prevStyleRef.current) {
        const rect = node.getBoundingClientRect();

        const scaleX = prev.rect.width / rect.width;
        const scaleY = prev.rect.height / rect.height;

        const prevCenterX = prev.rect.x + prev.rect.width / 2;
        const rectCenterX = rect.x + rect.width / 2;
        const x = prevCenterX - rectCenterX;

        const prevCenterY = prev.rect.y + prev.rect.height / 2;
        const rectCenterY = rect.y + rect.height / 2;
        const y = prevCenterY - rectCenterY;

        prevStyleRef.current = {
          ...prev.style,
          transitionDuration: '0s',
          transformOrigin: '50% 50%',
          transform: [
            `translate(${x}px, ${y}px)`,
            `scale(${scaleX}, ${scaleY})`,
          ].join(' '),
        };

        Object.assign(node.style, prevStyleRef.current);
      }

      node.addEventListener('transitioncancel', stop);
      node.addEventListener('transitionend', stop);

      return () => {
        stop();
        node.addEventListener('transitioncancel', stop);
        node.removeEventListener('transitionend', stop);
      };
    }
  }, []);

  return (
    <Tag
      ref={mergedRefs}
      style={style}
      className={cn(
        'absolute',
        'inset-0',
        'transition-all',
        'duration-200',
        'ease-linear',
        className
      )}
      {...props}
    />
  );
});
