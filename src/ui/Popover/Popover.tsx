import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { useOutsideClick } from '../hooks';
import { animationLoop } from '../utils';
import { PopoverContent } from './PopoverContent';
import { PopoverContext } from './popoverContext';
import { PopoverTrigger } from './PopoverTrigger';

type PopoverProps = PropsWithChildren<{
  updateMode?: 'always' | 'optimized';
  defaultOpen?: boolean;
}>;

export const Popover = (inProps: PopoverProps) => {
  const { updateMode = 'optimized', defaultOpen, children } = inProps;

  const [open, setOpen] = useState(defaultOpen || false);

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

      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      //const triggerCenterY = triggerRect.height / 2;

      const top = triggerRect.bottom + 8;
      const left = Math.min(
        Math.max(triggerCenterX - contentRect.width / 2, 16),
        innerWidth - contentRect.width - 16
      );

      const contentOriginX = triggerCenterX - left;

      const maxWidth = innerWidth - 32;
      const maxHeight = innerHeight - 32;

      content.style.transformOrigin = `${contentOriginX}px 0px`;
      content.style.setProperty('--max-width', `${maxWidth}px`);
      content.style.setProperty('--max-height', `${maxHeight}px`);
      content.style.setProperty('--x', `${left}px`);
      content.style.setProperty('--y', `${top}px`);
    }
  }, []);

  useEffect(() => {
    if (updateMode === 'always') {
      doTheMath();
      return animationLoop(doTheMath);
    } else {
      if (open) {
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
  }, [updateMode, open]);

  useOutsideClick([triggerRef, contentRef], () => {
    setOpen(false);
  });

  return (
    <PopoverContext
      value={{
        updateMode,
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
