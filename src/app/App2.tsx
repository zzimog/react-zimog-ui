import {
  type ReactNode,
  type ReactElement,
  type RefAttributes,
  type RefObject,
  Children,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useRef,
  useLayoutEffect,
  useState,
} from 'react';
import { useMergedRefs } from '@ui';

/*---------------------------------------------------------------------------*/

const Item = (props: { selected?: boolean; children: ReactNode }) => (
  <HighlightItem selected={props.selected}>
    <div className="relative z-10 p-2 border border-black">
      {props.children}
    </div>
  </HighlightItem>
);

const App = () => {
  const [mounted, setMounted] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  function handleHighlight(rect?: DOMRect) {
    const node = ref.current;

    if (node) {
      if (rect) {
        const { top, left, width, height } = rect;

        Object.assign(node.style, {
          visibility: 'visible',
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`,
          height: `${height}px`,
        });
      } else {
        node.style.visibility = 'hidden';
      }
    }
  }

  return (
    <div className="h-60 flex flex-col gap-2 p-2 bg-gray-200">
      <a href="#!" onClick={() => setMounted(!mounted)}>
        Toggle
      </a>

      {mounted && (
        <HighlightGroup defaultSelected={2} onHighlight={handleHighlight}>
          <div className="relative flex flex-col gap-4">
            <div ref={ref} className="absolute bg-red-500 z-0 transition-all" />
            <Item>1. Lorem</Item>
            <Item>2. Ipsum</Item>
            <Item>3. Dolor</Item>
          </div>
        </HighlightGroup>
      )}
    </div>
  );
};

export default App;

/*---------------------------------------------------------------------------*/

type HighlightGroupContextType = {
  type: 'click' | 'focus' | 'hover';
  nodes: RefObject<HTMLElement[]>;
  highlightNode: (node: HTMLElement) => void;
};
const HighlightGroupContext = createContext<
  HighlightGroupContextType | undefined
>(undefined);

/*---------------------------------------------------------------------------*/

type HighlightGroupProps = {
  type?: 'click' | 'focus' | 'hover';
  defaultSelected?: number;
  children: ReactElement;
  onHighlight?: (relativeRect?: DOMRect) => void;
};

function rectEquals(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.width === rect2.width &&
    rect1.height === rect2.height &&
    rect1.top === rect2.top &&
    rect1.right === rect2.right &&
    rect1.bottom === rect2.bottom &&
    rect1.left === rect2.left
  );
}

function getRelativeRect(rootRect: DOMRect, nodeRect: DOMRect): DOMRect {
  const top = nodeRect.top - rootRect.top;
  const left = nodeRect.left - rootRect.left;

  const relativeRect = {
    x: left,
    y: top,
    width: nodeRect.width,
    height: nodeRect.height,
    top,
    left,
    right: left + nodeRect.width,
    bottom: top + nodeRect.height,
  };

  return Object.freeze({
    ...relativeRect,
    toJSON: () => relativeRect,
  });
}

const HighlightGroup = (inProps: HighlightGroupProps) => {
  const { type = 'click', defaultSelected, children, onHighlight } = inProps;

  const ref = useRef<HTMLElement>(null);
  const nodesRef = useRef<HTMLElement[]>([]);

  const selectedRef = useRef<HTMLElement>(undefined);
  const prevRectRef = useRef<DOMRect>(undefined);

  const child = Children.only(children) as ReactElement<RefAttributes<unknown>>;
  const mergedRefs = useMergedRefs(child.props.ref, ref);

  const context = {
    type,
    nodes: nodesRef,
    highlightNode(node: HTMLElement) {
      selectedRef.current = node;
    },
  };

  useLayoutEffect(() => {
    const selected = selectedRef.current;
    let raf: number;

    if (!selected && defaultSelected !== undefined) {
      selectedRef.current = nodesRef.current[defaultSelected];
    }

    function loop() {
      const root = ref.current;
      const node = selectedRef.current;

      if (root && node) {
        const rootRect = root.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();
        const relativeRect = getRelativeRect(rootRect, nodeRect);

        if (
          prevRectRef.current &&
          !rectEquals(relativeRect, prevRectRef.current)
        ) {
          onHighlight?.(relativeRect);
        }

        prevRectRef.current = relativeRect;
      }

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [defaultSelected, onHighlight]);

  return (
    <HighlightGroupContext value={context}>
      {cloneElement(child, { ref: mergedRefs })}
    </HighlightGroupContext>
  );
};

/*---------------------------------------------------------------------------*/

type HighlightItemProps = {
  selected?: boolean;
  children: ReactElement;
};

const HighlightItem = (inProps: HighlightItemProps) => {
  const { selected, children } = inProps;

  const context = useContext(HighlightGroupContext);

  if (!context) {
    throw new Error(
      'HighlightItem component must be used inside HighlightGroup component.'
    );
  }

  const ref = useCallback(
    (node: HTMLElement) => {
      const { type, nodes: nodesRef, highlightNode } = context;

      const eventType = type === 'hover' ? 'mouseover' : type;
      const handler = () => highlightNode(node);

      nodesRef.current.push(node);

      if (selected) {
        highlightNode(node);
      }

      node.addEventListener(eventType, handler);
      return () => {
        const nodes = nodesRef.current;
        nodesRef.current = nodes.filter((n) => n !== node);

        node.removeEventListener(eventType, handler);
      };
    },
    [selected, context]
  );

  const child = Children.only(children) as ReactElement<RefAttributes<unknown>>;
  const mergedRefs = useMergedRefs(child.props.ref, ref);

  return cloneElement(child, { ref: mergedRefs });
};
