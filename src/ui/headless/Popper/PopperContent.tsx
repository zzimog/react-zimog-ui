import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { createPortal } from 'react-dom';
import { Presence } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { placeContent } from './place-content';
import { Popper } from './Popper';

const DISPLAY_NAME = 'PopperContent';

type BaseProps = ComponentPropsWithRef<typeof Presence>;
type PopperContentProps = BaseProps & {
  avoidCollisions?: boolean;
  distance?: number;
  padding?: number;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
};

export const PopperContent = (inProps: PopperContentProps) => {
  const {
    ref: refProp,
    avoidCollisions = false,
    distance,
    padding,
    side,
    align,
    style,
    ...props
  } = inProps;

  const { anchor } = Popper.useContext(DISPLAY_NAME);

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  useEffect(() => {
    function handleResize() {
      const content = ref.current;
      if (anchor && content) {
        placeContent({
          anchor,
          content,
          distance,
          padding,
          side,
          align,
          avoidCollisions,
        });
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [anchor, distance, padding, side, align, avoidCollisions]);

  return createPortal(
    <Presence
      ref={mergedRefs}
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

PopperContent.displayName = DISPLAY_NAME;
