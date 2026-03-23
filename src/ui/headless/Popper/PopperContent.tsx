import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
} from 'react';
import { createPortal } from 'react-dom';
import { Presence } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { placeContent } from './place-content';
import { Popper } from './Popper';

const DISPLAY_NAME = 'PopperContent';

type BaseProps = ComponentPropsWithRef<typeof Presence>;
type PopperContentProps = BaseProps & {
  distance?: number;
  padding?: number;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  avoidCollisions?: boolean;
};

export const PopperContent = (inProps: PopperContentProps) => {
  const {
    ref: refProp,
    present,
    distance,
    padding,
    side,
    align,
    avoidCollisions,
    style,
    ...props
  } = inProps;

  const { anchor } = Popper.useContext(DISPLAY_NAME);

  const [isPlaced, setIsPlaced] = useState(false);

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const handlePlacement = useCallback(() => {
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
  }, [anchor, distance, padding, side, align, avoidCollisions]);

  useEffect(() => {
    if (present) {
      function handleResize() {
        handlePlacement();
        setIsPlaced(true);
      }

      handleResize();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize, true);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
      };
    }
  }, [present, handlePlacement]);

  return createPortal(
    <Presence
      ref={mergedRefs}
      present={present}
      {...props}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        animationName: isPlaced ? undefined : 'none',
        ...style,
      }}
    />,
    document.body
  );
};

PopperContent.displayName = DISPLAY_NAME;
