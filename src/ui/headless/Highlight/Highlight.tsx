import { useEffect, useRef, type ComponentProps } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { HighlightIndicator } from './HighlightIndicator';
import { HighlightItem } from './HighlightItem';
import { HighlightContext } from './context';

type ContextProps = ComponentProps<typeof HighlightContext>;
type HighlightProps = NativeProps<'div'> & {
  type?: ContextProps['type'];
  leaveMode?: ContextProps['leaveMode'];
};

export const Highlight = (inProps: HighlightProps) => {
  const {
    ref: refProp,
    type = 'none',
    leaveMode = 'none',
    children,
    style,
    ...props
  } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const currentRef = useRef<HTMLElement>(null);
  function setCurrent(element: HTMLElement | null) {
    currentRef.current = element;
  }

  useEffect(() => {
    const node = ref.current;
    if (node && leaveMode === 'parent') {
      const handleClickOutside = ({ target }: Event) => {
        if (node !== target && !node.contains(target as Node)) {
          setCurrent(null);
        }
      };

      const handleLeave = (event: Event) => {
        if (node === event.target) {
          setCurrent(null);
        }
      };

      switch (type) {
        case 'click':
          window.addEventListener('click', handleClickOutside);
          return () => window.removeEventListener('click', handleClickOutside);

        case 'hover':
          node.addEventListener('mouseleave', handleLeave);
          return () => node.removeEventListener('mouseleave', handleLeave);

        case 'focus':
          node.addEventListener('foucsout', handleLeave);
          return node.removeEventListener('focusout', handleLeave);
      }
    }
  }, [ref.current, leaveMode, type]);

  return (
    <Native.div
      ref={mergedRefs}
      {...props}
      style={{
        position: 'relative',
        ...style,
      }}
    >
      <HighlightContext
        type={type}
        leaveMode={leaveMode}
        rootRef={ref}
        currentRef={currentRef}
        onCurrentChange={setCurrent}
      >
        {children}
      </HighlightContext>
    </Native.div>
  );
};

Highlight.displayName = 'Highlight';
Highlight.Item = HighlightItem;
Highlight.Indicator = HighlightIndicator;
