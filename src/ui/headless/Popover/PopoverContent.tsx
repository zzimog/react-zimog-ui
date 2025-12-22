import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { Presence } from '../Presence';
import { usePopoverContext } from './context';

const DISPLAY_NAME = 'PopoverContent';

type PresenceProps = Omit<NativeProps<typeof Presence>, 'present'>;
type PopoverContentProps = PresenceProps & {
  avoidCollisions?: boolean;
  distance?: number;
  padding?: number;
  align?: 'start' | 'center' | 'end';
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export const PopoverContent = (inProps: PopoverContentProps) => {
  const {
    ref: refProp,
    avoidCollisions = false,
    distance = 8,
    padding = 16,
    align = 'center',
    style,
    ...props
  } = inProps;

  const context = usePopoverContext(DISPLAY_NAME);
  const { contentId, trigger, open, setOpen } = context;

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const handleOutside = useCallback(
    (event: Event) => {
      const content = ref.current;
      for (const element of [trigger, content]) {
        const target = event.target as HTMLElement;
        if (element && element.contains(target)) {
          return;
        }
      }

      setOpen(false);
    },
    [trigger]
  );

  const handleResize = useCallback(() => {
    const content = ref.current;
    if (trigger && content) {
      const { innerWidth, innerHeight } = window;
      const triggerRect = trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();

      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      //const triggerCenterY = triggerRect.height / 2;

      let posX = triggerCenterX - contentRect.width / 2;

      if (align === 'start') {
        posX = triggerRect.left;
      } else if (align === 'end') {
        posX = triggerRect.right - contentRect.width;
      }

      const pos = {
        x: clamp(
          posX,
          padding,
          Math.max(innerWidth - contentRect.width - padding, padding)
        ),
        y: triggerRect.bottom + distance,
      };

      const origin = {
        x: clamp(triggerCenterX - pos.x, 0, contentRect.width),
        y: clamp(0, 0, contentRect.height),
      };

      if (
        avoidCollisions &&
        pos.y + contentRect.height > innerHeight - padding &&
        contentRect.height <= triggerRect.top - distance - padding
      ) {
        pos.y = triggerRect.top - distance - contentRect.height;
        origin.y = contentRect.height;
      }

      const maxWidth = innerWidth - pos.x - padding;
      const maxHeight = innerHeight - pos.y - padding;

      const x = Math.floor(pos.x);
      const y = Math.floor(pos.y);

      content.style.translate = `${x}px ${y}px`;
      content.style.transformOrigin = `${origin.x}px ${origin.y}px`;
      content.style.setProperty('--trigger-width', `${triggerRect.width}px`);
      content.style.setProperty('--trigger-height', `${triggerRect.height}px`);
      content.style.setProperty('--available-width', `${maxWidth}px`);
      content.style.setProperty('--available-height', `${maxHeight}px`);
    }
  }, [avoidCollisions, trigger]);

  useEffect(() => {
    if (trigger && open) {
      handleResize();
      window.addEventListener('pointerdown', handleOutside);
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize, true);
      return () => {
        window.removeEventListener('pointerdown', handleOutside);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
      };
    }
  }, [trigger, open]);

  return createPortal(
    <Presence
      ref={mergedRefs}
      present={open}
      role="dialog"
      id={contentId}
      {...props}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        ...style,
      }}
    />,
    document.body
  );
};

PopoverContent.displayName = DISPLAY_NAME;
