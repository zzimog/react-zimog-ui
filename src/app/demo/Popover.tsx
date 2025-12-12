import {
  Button,
  Card,
  Popover,
  useFocusGuards,
  useFocusScope,
  useMergedRefs,
} from '@ui';
import { type ComponentPropsWithRef, useEffect, useRef, useState } from 'react';
import { DemoContainer } from './DemoContainer';

const code = `// Example code
import { Popover } from '@ui';

export default () => (
  <Popover>
    <Popover.Trigger />
    <Popover.Content />
  </Popover>
);`;

const Content = (inProps: ComponentPropsWithRef<'div'>) => {
  const { ref, ...props } = inProps;

  const focusRef = useFocusScope();
  const mergedRef = useMergedRefs(ref, focusRef);

  useFocusGuards();

  return (
    <div
      ref={mergedRef}
      {...props}
      className="p-2 overflow-auto"
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
        }
      }}
    >
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          tabIndex={0}
          className="p-2 rounded-shape outline-0 focus:bg-highlight"
          onPointerOver={({ target }) =>
            (target as HTMLElement).focus({ preventScroll: true })
          }
        >
          {i}. Lorem ipsum dolor sit amet
        </div>
      ))}
    </div>
  );
};

export default () => {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const content = contentRef.current;
    if (content && open) {
      content.scrollTop = scrollRef.current;
    }
  }, [open]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement;
      const trigger = triggerRef.current;
      const content = contentRef.current;
      for (const element of [trigger, content]) {
        if (element && element.contains(target)) {
          return;
        }

        setOpen(false);
      }
    }

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <DemoContainer title="Popover" code={code}>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger ref={triggerRef} asChild>
          <Button>Toggle</Button>
        </Popover.Trigger>
        <Popover.Content avoidCollisions>
          <Card className="flex flex-col w-80 max-h-80 p-0">
            <Content
              ref={contentRef}
              onScroll={(event) => {
                const target = event.target as Element;
                scrollRef.current = target.scrollTop;
              }}
            />
          </Card>
        </Popover.Content>
      </Popover>
    </DemoContainer>
  );
};
