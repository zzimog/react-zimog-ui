import { useEffect, useRef } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useCallbackRef, useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { FocusStack } from './focus-stack';
import { getFocusableEdges } from './get-focusable-edges';
import { useFocusGuards } from './use-focus-guards';

const DISPLAY_NAME = 'FocusTrap';
const EVENT_MOUNT = `${DISPLAY_NAME}.MOUNT`;
const EVENT_UNMOUNT = `${DISPLAY_NAME}.UNMOUNT`;
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

type BaseProps = NativeProps<'div'>;
interface FocusTrapProps extends BaseProps {
  loop?: boolean;
  trapped?: boolean;
  onMount?(event: Event): void;
  onUnmount?(event: Event): void;
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
    onKeyDown,
    onMount: onMountProp,
    onUnmount: onUnmountProp,
    ...props
  } = inProps;

  const enabledRef = useRef(true);
  const previousFocusedRef = useRef<HTMLElement>(null);
  const lastFocusedRef = useRef<HTMLElement>(null);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const onMount = useCallbackRef(onMountProp);
  const onUnmount = useCallbackRef(onUnmountProp);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const currentActive = document.activeElement as HTMLElement | null;
      if (!node.contains(currentActive)) {
        const eventMount = new CustomEvent(EVENT_MOUNT, EVENT_OPTIONS);
        node.addEventListener(EVENT_MOUNT, onMount);
        node.dispatchEvent(eventMount);

        if (!eventMount.defaultPrevented) {
          const [first] = getFocusableEdges(node);
          first?.focus();
        }

        previousFocusedRef.current = currentActive;
      }

      FocusStack.add(enabledRef);
      return () => {
        const eventUnmount = new CustomEvent(EVENT_UNMOUNT, EVENT_OPTIONS);
        node.addEventListener(EVENT_UNMOUNT, onUnmount);
        node.dispatchEvent(eventUnmount);

        if (!eventUnmount.defaultPrevented) {
          const focusTarget = previousFocusedRef.current ?? document.body;
          focusTarget?.focus();
        }

        node.removeEventListener(EVENT_MOUNT, onMount);
        node.removeEventListener(EVENT_UNMOUNT, onUnmount);
        FocusStack.remove(enabledRef);
      };
    }
  }, [onMount, onUnmount]);

  useEffect(() => {
    const node = ref.current;
    const isEnabled = enabledRef.current;
    if (node && trapped) {
      /**
       * @todo
       * Parametrize the ability to focus container
       * by removing `node !== target`
       */
      function handleFocusIn(event: FocusEvent) {
        if (node && isEnabled) {
          const target = event.target as HTMLElement;
          if (node !== target && node.contains(target)) {
            lastFocusedRef.current = target;
          } else {
            focus(lastFocusedRef.current);
          }
        }
      }

      function handleFocusOut(event: FocusEvent) {
        if (node && isEnabled) {
          const relatedTarget = event.relatedTarget as HTMLElement;
          if (relatedTarget && !node.contains(relatedTarget)) {
            focus(lastFocusedRef.current);
          }
        }
      }

      const observer = new MutationObserver((mutations: MutationRecord[]) => {
        if (document.activeElement === document.body) {
          for (const mutation of mutations) {
            if (mutation.removedNodes.length > 0) {
              focus(node);
            }
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
    }
  }, [trapped]);

  useFocusGuards();

  return (
    <Native.div
      ref={mergedRef}
      tabIndex={-1}
      {...props}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        const node = ref.current;
        if (node && loop) {
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
