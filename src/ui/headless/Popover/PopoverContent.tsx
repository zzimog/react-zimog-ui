import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { Presence } from '../Presence';
import { placeContent } from './place-content';
import { Popover } from './Popover';

const DISPLAY_NAME = 'PopoverContent';

type PresenceProps = Omit<NativeProps<typeof Presence>, 'present'>;
type PopoverContentProps = PresenceProps & {
  avoidCollisions?: boolean;
  distance?: number;
  padding?: number;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
};

export const PopoverContent = (inProps: PopoverContentProps) => {
  const {
    ref: refProp,
    avoidCollisions = false,
    distance = 8,
    padding = 16,
    side,
    align,
    style,
    ...props
  } = inProps;

  const context = Popover.useContext(DISPLAY_NAME);
  const { contentId, trigger, open, onOpenChange } = context;

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  useEffect(() => {
    if (open) {
      function handleResize() {
        const content = ref.current;
        if (trigger && content) {
          placeContent({
            anchor: trigger,
            content,
            distance,
            padding,
            side,
            align,
            avoidCollisions,
          });
        }
      }

      function handleOutside(event: Event) {
        const content = ref.current;
        for (const element of [trigger, content]) {
          const target = event.target as HTMLElement;
          if (element && element.contains(target)) {
            return;
          }
        }

        onOpenChange(false);
      }

      handleResize();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize, true);
      window.addEventListener('pointerdown', handleOutside);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
        window.removeEventListener('pointerdown', handleOutside);
      };
    }
  }, [open, trigger, distance, padding, side, align, avoidCollisions]);

  return createPortal(
    <Presence
      ref={mergedRefs}
      present={open}
      role="dialog"
      id={contentId}
      data-open={open}
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
