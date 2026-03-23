import {
  useLayoutEffect,
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

  useLayoutEffect(() => {
    if (present) {
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
  }, [present, anchor, distance, padding, side, align, avoidCollisions]);

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
