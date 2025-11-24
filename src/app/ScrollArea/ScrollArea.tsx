import { cn, Poly, useMergedRefs, type PolyProps } from '@ui';
import { useCallback } from 'react';

type ScrollAreaProps = PolyProps<'div'>;

function getSlot(container: HTMLElement, name: string) {
  return container.querySelector<HTMLElement>(`[data-slot="${name}"]`);
}

export const ScrollArea = (inProps: ScrollAreaProps) => {
  const { ref: refProp, className, children, ...props } = inProps;

  const ref = useMergedRefs(
    refProp,
    useCallback((node: HTMLElement) => {
      const viewport = getSlot(node, 'viewport')!;
      const thumb = getSlot(node, 'thumb')!;

      const thumbRatio = viewport.clientHeight / viewport.scrollHeight;
      const thumbSize = node.offsetHeight * thumbRatio;
      thumb.style.height = `${thumbSize}px`;

      function handleScroll(event: Event) {
        const { scrollTop, scrollHeight, clientHeight } = viewport;

        const scrollPerc =
          (scrollTop / (scrollHeight - clientHeight)) *
          (node.clientHeight - thumbSize);

        thumb.style.transform = `translateY(${scrollPerc}px)`;
      }

      viewport.addEventListener('scroll', handleScroll);
      return () => viewport.removeEventListener('scroll', handleScroll);
    }, [])
  );

  return (
    <Poly.div
      {...props}
      ref={ref}
      data-slot="scrollarea"
      className={cn(
        'group/scrollarea',
        'relative',
        '__overflow-hidden',
        className
      )}
    >
      <div
        data-slot="viewport"
        className={cn(
          'size-full',
          'pr-5',
          'overflow-scroll',
          '[scrollbar-width:none]',
          '[-ms-overflow-style:none]',
          '[-webkit-overflow-scrolling:touch]',
          '[&::-webkit-scrollbar]:hidden'
        )}
      >
        {children}
      </div>
      <div
        data-slot="scrollbar"
        className="hidden_group-hover/scrollarea:block absolute top-0 right-0 bottom-0 w-5 bg-red-500"
      >
        <div data-slot="arrow-up" />
        <div data-slot="thumb" className="absolute size-5 bg-blue-500" />
        <div data-slot="arrow-down" />
      </div>
    </Poly.div>
  );
};
