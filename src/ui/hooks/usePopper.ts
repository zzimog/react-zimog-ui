import { useState, useRef, useEffect, type RefObject } from 'react';
import { useOutsideClick } from './use-outside-click';

type PopperPlacement = 'top' | 'right' | 'bottom' | 'left';

type PopperAlign = 'start' | 'center' | 'end';

export type PopperOptions = {
  open?: boolean;
  distance?: number;
  flip?: boolean;
  position?: `${PopperPlacement}-${PopperAlign}` | (string & {});
};

export type PopperObject<T extends HTMLElement, L extends HTMLElement> = {
  triggerRef: RefObject<T | null>;
  layerRef: RefObject<L | null>;
  layerOpen: boolean;
};

export function usePopper<T extends HTMLElement, L extends HTMLElement>(
  options: PopperOptions = {}
): PopperObject<T, L> {
  const {
    open = false,
    distance = 8,
    flip = true,
    position = 'bottom-center',
  } = options;

  const [layerOpen, setLayerOpen] = useState(open);

  const triggerRef = useRef<T>(null);
  const triggerRectRef = useRef<DOMRect>(null);

  const layerRef = useRef<L>(null);

  useEffect(() => {
    if (!triggerRef.current) {
      return;
    }

    const trigger = triggerRef.current;

    function handleLayerOpen() {
      setLayerOpen((prev) => !prev);
    }

    function getTriggerRect() {
      let timeout = null;

      if (document.readyState === 'complete') {
        triggerRectRef.current = trigger.getBoundingClientRect();

        if (timeout) {
          clearTimeout(timeout);
        }
      } else {
        timeout = setTimeout(getTriggerRect, 0);
      }
    }

    getTriggerRect();
    trigger.addEventListener('click', handleLayerOpen);
    window.addEventListener('resize', getTriggerRect);
    window.addEventListener('scroll', getTriggerRect);

    return () => {
      trigger.removeEventListener('click', handleLayerOpen);
      window.removeEventListener('resize', getTriggerRect);
      window.removeEventListener('scroll', getTriggerRect);
    };
  }, []);

  useEffect(() => {
    if (!layerRef.current || !layerOpen) {
      return;
    }

    const layer = layerRef.current;
    layer.style.position = 'fixed';

    function handleStyleChange() {
      if (!triggerRectRef.current) {
        return;
      }

      const { innerWidth, innerHeight } = window;
      const triggerRect = triggerRectRef.current;
      const layerRect = layer.getBoundingClientRect();

      const [placement, align] = position.split('-');

      const potentialPositions: Record<string, number> = {
        top: triggerRect.top - layerRect.height - distance,
        bottom: triggerRect.bottom + distance,
        left: triggerRect.left - layerRect.width - distance,
        right: triggerRect.right + distance,
      };

      let top = 0;
      let left = 0;

      if (placement === 'top' || placement === 'bottom') {
        // Vertical
        top = potentialPositions[placement];

        // Flip
        if (flip) {
          if (placement === 'top' && top < distance) {
            top = potentialPositions.bottom;
          }

          if (placement === 'bottom' && top + layerRect.height > innerHeight) {
            top = potentialPositions.top;
          }
        }

        // Horizontal
        left = triggerRect.left;

        if (align === 'center') {
          left += (triggerRect.width - layerRect.width) / 2;
        }

        if (align === 'end') {
          left += triggerRect.width - layerRect.width;
        }
      } else {
        // Horizontal
        left = potentialPositions[placement];

        // Flip
        if (flip) {
          if (placement === 'left' && left < distance) {
            left = potentialPositions.right;
          }

          if (placement === 'right' && left + layerRect.width > innerWidth) {
            left = potentialPositions.left;
          }
        }

        // Vertical
        top = triggerRect.top;

        if (align === 'center') {
          top += (triggerRect.height - layerRect.height) / 2;
        }

        if (align === 'end') {
          top += triggerRect.height - layerRect.height;
        }
      }

      Object.assign(layer.style, {
        top: 0,
        left: 0,
        transform: `translate(${left}px, ${top}px)`,
      });
    }

    handleStyleChange();
    window.addEventListener('resize', handleStyleChange);
    window.addEventListener('scroll', handleStyleChange);

    return () => {
      window.removeEventListener('resize', handleStyleChange);
      window.removeEventListener('scroll', handleStyleChange);
    };
  }, [distance, flip, position, layerOpen]);

  useOutsideClick(
    [triggerRef, layerRef],
    () => {
      setLayerOpen(false);
    },
    layerOpen
  );

  return {
    triggerRef,
    layerRef,
    layerOpen,
  };
}
