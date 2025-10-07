import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import { useMergedRefs, cn } from '@ui';

export type PresenceProps = {
  as?: ElementType;
  visible?: boolean;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

type PresenceState = 'unmounted' | 'animating' | 'mounted';

export const Presence = (inProps: PresenceProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    visible = true,
    children,
    ...props
  } = inProps;

  const initialState = visible ? 'mounted' : 'unmounted';
  const [state, setState] = useState<PresenceState>(initialState);

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs<HTMLElement>(refProp, ref);

  const isVisible = state !== 'unmounted';

  useLayoutEffect(() => {
    const styles = getComputedStyle(ref.current!);
    const currentAnimation = styles.animationName;

    if (visible) {
      setState('mounted');
    } else if (currentAnimation === 'none') {
      setState('unmounted');
    } else {
      setState('animating');
    }
  }, [visible]);

  useLayoutEffect(() => {
    const node = ref.current!;
    let raf: number;

    function handleAnimationEnd() {
      if (!visible) {
        setState('unmounted');

        const currentFill = node.style.animationFillMode;
        node.style.animationFillMode = 'forwards';

        raf = requestAnimationFrame(() => {
          if (node.style.animationFillMode === 'forwards') {
            node.style.animationFillMode = currentFill;
          }
        });
      }
    }

    node.addEventListener('animationcancel', handleAnimationEnd);
    node.addEventListener('animationend', handleAnimationEnd);

    return () => {
      cancelAnimationFrame(raf);
      node.removeEventListener('animationcancel', handleAnimationEnd);
      node.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [visible]);

  return (
    <Tag
      ref={mergedRefs}
      data-state={visible ? 'open' : 'closed'}
      hidden={!isVisible}
      {...props}
    >
      {isVisible && children}
    </Tag>
  );
};

Presence.displayName = 'Presence';

const App = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <button className="mr-10" onClick={() => setOpen(!open)}>
        Change state (current: {open ? 'true' : 'false'})
      </button>

      <Presence
        as="div"
        ref={ref}
        visible={open}
        className={cn(
          'p-2',
          'bg-amber-300',
          'data-[state="open"]:animate-height-grow',
          'data-[state="closed"]:animate-height-shrink',
          '[--height:200px]'
        )}
      >
        Hello World!
      </Presence>
    </>
  );
};

export default App;
