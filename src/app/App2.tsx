import { Popover, useFocusGuards, useFocusScope } from '@ui';
import { useEffect, useRef } from 'react';

const Content = () => {
  const focusRef = useFocusScope();

  useFocusGuards();

  return (
    <div ref={focusRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          tabIndex={0}
          className="w-120 py-4 text-justify outline-0 not-last:border-b focus:bg-red-500"
          onKeyDown={(event) => {
            if (event.key === 'Tab') {
              event.preventDefault();
            }
          }}
        >
          [{i}] Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Architecto consectetur atque adipisci sunt repudiandae magnam,
          molestiae corporis odit ea mollitia repellat, sit consequuntur labore
          odio dignissimos alias nobis est dolorum!
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  function handleOpenChange(open: boolean) {
    if (open) {
      requestAnimationFrame(() => {
        const content = contentRef.current;
        if (content) {
          content.scrollTop = scrollRef.current;
        }
      });
    }
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement;
      console.log(target);
    }

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <Popover onOpenChange={handleOpenChange}>
      <Popover.Trigger className="mt-40">Show lorem</Popover.Trigger>
      <Popover.Content
        avoidCollisions
        ref={contentRef}
        className="size-80 bg-zinc-200 overflow-auto"
        onScroll={(event) => {
          const target = event.target as Element;
          scrollRef.current = target.scrollTop;
        }}
      >
        <Content />
      </Popover.Content>
    </Popover>
  );
};

export default App;
