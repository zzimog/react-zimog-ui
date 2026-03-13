import { useCallback, useEffect, useRef } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { getFocusableEdges } from './get-focusable-edges';
import { useFocusGuards } from './use-focus-guards';

const DISPLAY_NAME = 'FocusTrap';

type BaseProps = NativeProps<'div'>;
interface FocusTrapProps extends BaseProps {
  loop?: boolean;
  trapped?: boolean;
  onMount?(): void;
  onUnmount?(): void;
}

function focus(element: HTMLElement | null) {
  if (element && element.focus) {
    element.focus({ preventScroll: true });
  }
}

export const FocusTrap = (inProps: FocusTrapProps) => {
  const {
    ref: refProp,
    loop,
    trapped = true,
    onMount,
    onUnmount,
    onKeyDown,
    ...props
  } = inProps;

  const lastFocusedRef = useRef<HTMLElement>(null);

  const ref = useMergedRefs(
    refProp,
    useCallback(
      (node: HTMLElement) => {
        if (trapped) {
          function handleFocusIn(event: FocusEvent) {
            const target = event.target as HTMLElement;
            if (node !== target && node.contains(target)) {
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

          const observer = new MutationObserver(
            (mutations: MutationRecord[]) => {
              if (document.activeElement === document.body) {
                for (const mutation of mutations) {
                  if (mutation.removedNodes.length > 0) {
                    focus(node);
                  }
                }
              }
            }
          );

          observer.observe(node, { childList: true, subtree: true });
          document.addEventListener('focusin', handleFocusIn);
          document.addEventListener('focusout', handleFocusOut);
          return () => {
            observer.disconnect();
            document.removeEventListener('focusin', handleFocusIn);
            document.removeEventListener('focusout', handleFocusOut);
          };
        }
      },
      [trapped]
    )
  );

  useEffect(() => {
    let raf: number | undefined;
    if (raf) {
      cancelAnimationFrame(raf);
    }

    onMount?.();
    return () => {
      raf = requestAnimationFrame(() => {
        onUnmount?.();
      });
    };
  }, [onMount, onUnmount]);

  useFocusGuards();

  return (
    <Native.div
      ref={ref}
      tabIndex={-1}
      {...props}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
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
      })}
    />
  );
};

FocusTrap.displayName = DISPLAY_NAME;
