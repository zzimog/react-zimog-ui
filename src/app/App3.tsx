import { createContext, useCallback, useContext, useRef } from 'react';
import { poly, cn, useMergedRefs, getRelativeRect } from '@ui';
import { useAnimationFrameLoop } from './motion';

export type HighlightContextType = {
  type: HighlightType;
  current?: HTMLElement;
  setCurrent: (node?: HTMLElement) => void;
};

export const HighlightContext = createContext<HighlightContextType | undefined>(
  undefined
);

export function useHighlightContext() {
  const context = useContext(HighlightContext);

  if (!context) {
    throw new Error('useHighlightContext must be used within HighlightContext');
  }

  return context;
}

/*---------------------------------------------------------------------------*/

export type HighlightType = 'click' | 'focus' | 'hover';

export type HighlightProps = {
  type?: HighlightType;
};

export const Highlight = poly.div<HighlightProps>((Tag, inProps) => {
  const { ref: refProp, type = 'click', children, ...props } = inProps;

  const rootRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLElement | undefined>(undefined);

  const ref = useCallback(
    (node: HTMLElement) => {
      if (type === 'hover') {
        function handleOut() {
          currentRef.current = undefined;
        }

        node.addEventListener('mouseleave', handleOut);
        return () => node.removeEventListener('mouseleave', handleOut);
      }
    },
    [type]
  );

  const mergedRefs = useMergedRefs(refProp, rootRef, ref);

  const context = {
    type,
    current: currentRef.current,
    setCurrent(node?: HTMLElement) {
      currentRef.current = node;
    },
  };

  useAnimationFrameLoop(() => {
    const root = rootRef.current;
    const highlight = highlightRef.current;
    const current = currentRef.current;

    if (root && highlight) {
      if (current) {
        const rootRect = root!.getBoundingClientRect();
        const currentRect = current!.getBoundingClientRect();

        const rect = getRelativeRect(rootRect, currentRect);

        Object.assign(highlight.style, {
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          transform: `translate(${rect.x}px, ${rect.y}px)`,
        });
      }

      highlight.hidden = current === undefined;
    }
  });

  return (
    <Tag
      ref={mergedRefs}
      className="relative w-200 flex flex-col gap-4"
      {...props}
    >
      <div
        ref={highlightRef}
        className="absolute z-0 bg-red-500 transition-all duration-300"
      />
      <div className="relative z-1">
        <HighlightContext value={context}>{children}</HighlightContext>
      </div>
    </Tag>
  );
});

/*---------------------------------------------------------------------------*/

export type HighlightItemProps = {
  selected?: boolean;
  disabled?: boolean;
};

export const HighlightItem = poly.div<HighlightItemProps>((Tag, inProps) => {
  const { ref: refProp, selected, disabled, className, ...props } = inProps;

  const clsx = 'w-fit p-4 border border-black';

  const context = useHighlightContext();

  const ref = useCallback(
    (node: HTMLElement) => {
      const { type, setCurrent } = context;
      const eventType = type === 'hover' ? 'mouseover' : type;

      function handleEvent() {
        if (!disabled) {
          setCurrent(node);
        }
      }

      if (selected) {
        handleEvent();
      }

      node.addEventListener(eventType, handleEvent);
      return () => node.removeEventListener(eventType, handleEvent);
    },
    [disabled, context]
  );

  const mergedRefs = useMergedRefs(refProp, ref);

  return <Tag ref={mergedRefs} className={cn(clsx, className)} {...props} />;
});

Highlight.Item = HighlightItem;

/*---------------------------------------------------------------------------*/

const App = () => {
  return (
    <Highlight type="hover">
      <Highlight.Item>Lorem ipsum dolor</Highlight.Item>
      <Highlight.Item className="ml-auto">Sit</Highlight.Item>
      <Highlight.Item className="mx-auto">Amet consectetur</Highlight.Item>
    </Highlight>
  );
};

export default App;
