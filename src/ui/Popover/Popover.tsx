import {
  type ReactNode,
  useState,
  useRef,
  useId,
  useLayoutEffect,
  useCallback,
} from 'react';
import { animationLoop } from '../utils';
import { PopoverTrigger } from './PopoverTrigger';
import { PopoverContent } from './PopoverContent';
import { PopoverContext } from './popoverContext';

export type PopoverProps = {
  update?: 'always' | 'optimized';
  open?: boolean;
  children?: ReactNode;
};

export const Popover = (inProps: PopoverProps) => {
  const { update = 'optimized', open: openProp, children } = inProps;

  const initialOpen = openProp || false;
  const [open, setOpen] = useState(initialOpen);

  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const contentId = useId();

  const doTheMath = useCallback(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;
    if (trigger && content) {
      const { innerWidth, innerHeight } = window;
      const triggerRect = trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();

      const triggerCenterX = triggerRect.width / 2;
      //const triggerCenterY = triggerRect.height / 2;

      const top = triggerRect.bottom + 8;
      const left = Math.max(
        triggerRect.left + triggerCenterX - contentRect.width / 2,
        16
      );

      const maxWidth = innerWidth - 32;
      const maxHeight = innerHeight - top - 32;

      Object.assign(content.style, {
        transformOrigin: 'center',
        transform: `translate3d(${left}px, ${top}px, 0px)`,
      });

      content.style.setProperty('--max-width', `${maxWidth}px`);
      content.style.setProperty('--max-height', `${maxHeight}px`);
    }
  }, []);

  useLayoutEffect(() => {
    if (open) {
      if (update === 'always') {
        doTheMath();
        return animationLoop(doTheMath);
      } else {
        const rafId = requestAnimationFrame(doTheMath);
        window.addEventListener('resize', doTheMath);
        window.addEventListener('scroll', doTheMath);
        return () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener('resize', doTheMath);
          window.removeEventListener('scroll', doTheMath);
        };
      }
    }
  }, [update, open]);

  return (
    <PopoverContext
      value={{
        triggerRef,
        contentRef,
        contentId,
        open,
        setOpen,
      }}
    >
      {children}
    </PopoverContext>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
