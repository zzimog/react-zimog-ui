import { useCallback, useRef, type KeyboardEvent } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { getFocusableEdges } from './get-focusable-edges';
import { useFocusGuards } from './use-focus-guards';

type FocusTrapProps = NativeProps<'div'> & {
  loop?: boolean;
};

function focus(element: HTMLElement | null) {
  if (element && element.focus) {
    element.focus({ preventScroll: true });
  }
}

export const FocusTrap = (inProps: FocusTrapProps) => {
  const { ref: refProp, loop, onKeyDown, ...props } = inProps;

  const lastFocusedRef = useRef<HTMLElement>(null);

  const ref = useMergedRefs(
    refProp,
    useCallback((node: HTMLElement) => {
      function handleFocusIn(event: FocusEvent) {
        const target = event.target as HTMLElement;
        if (node.contains(target)) {
          lastFocusedRef.current = target;
        } else {
          focus(lastFocusedRef.current);
        }
      }

      function handleFocusOut(event: FocusEvent) {
        const relatedTarget = event.relatedTarget as HTMLElement;
        if (relatedTarget && !node.contains(relatedTarget)) {
          focus(lastFocusedRef.current);
        }
      }

      const observer = new MutationObserver((mutations: MutationRecord[]) => {
        const focused = document.activeElement as HTMLElement | null;
        if (focused !== document.body) return;
        for (const mutation of mutations) {
          if (mutation.removedNodes.length > 0) {
            focus(node);
          }
        }
      });

      observer.observe(node, { childList: true, subtree: true });
      document.addEventListener('focusin', handleFocusIn);
      document.addEventListener('focusout', handleFocusOut);
      return () => {
        observer.disconnect();
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
      };
    }, [])
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (loop) {
        const node = event.currentTarget as HTMLElement;
        const isTab =
          event.key === 'Tab' &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey;

        if (isTab) {
          const currentElement = document.activeElement as HTMLElement;
          const [first, last] = getFocusableEdges(node);

          if (first && last) {
            if (event.shiftKey && currentElement === first) {
              event.preventDefault();
              focus(last);
            } else if (!event.shiftKey && currentElement === last) {
              event.preventDefault();
              focus(first);
            }
          }
        }
      }
    },
    [loop]
  );

  useFocusGuards();

  return (
    <Native.div
      ref={ref}
      tabIndex={-1}
      {...props}
      onKeyDown={composeHandlers(onKeyDown, handleKeyDown)}
    />
  );
};
