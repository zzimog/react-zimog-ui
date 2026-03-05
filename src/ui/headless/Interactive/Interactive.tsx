import type { KeyboardEvent, PointerEvent } from 'react';
import { composeHandlers } from '@ui/utils';
import { Native, type NativeProps } from '../Native';

const ARROW_KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
const PAGE_KEYS = ['PageUp', 'PageDown'];

type KeyEvent = KeyboardEvent<HTMLDivElement>;
type SlideEvent = PointerEvent<HTMLDivElement>;

type InteractiveProps = NativeProps<'div'> & {
  onArrowKey?(event: KeyEvent): void;
  onPageKey?(event: KeyEvent): void;
  onStepKey?(event: KeyEvent): void;
  onHomeKey?(event: KeyEvent): void;
  onEndKey?(event: KeyEvent): void;
  onEscapeKey?(event: KeyEvent): void;
  onSlideStart?(event: SlideEvent): void;
  onSlideMove?(event: SlideEvent): void;
  onSlideEnd?(event: SlideEvent): void;
};

export const Interactive = (inProps: InteractiveProps) => {
  const {
    onArrowKey,
    onPageKey,
    onStepKey,
    onHomeKey,
    onEndKey,
    onEscapeKey,
    onSlideStart,
    onSlideMove,
    onSlideEnd,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    ...props
  } = inProps;

  return (
    <Native.div
      {...props}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if ([...ARROW_KEYS, ...PAGE_KEYS].includes(event.key)) {
          if (ARROW_KEYS.includes(event.key)) {
            onArrowKey?.(event);
          } else if (PAGE_KEYS.includes(event.key)) {
            onPageKey?.(event);
          }

          onStepKey?.(event);
          event.preventDefault();
        } else if (event.key === 'Home') {
          onHomeKey?.(event);
          event.preventDefault();
        } else if (event.key === 'End') {
          onEndKey?.(event);
          event.preventDefault();
        } else if (event.key === 'Escape') {
          onEscapeKey?.(event);
        }
      })}
      onPointerDown={composeHandlers(onPointerDown, (event) => {
        const target = event.target as HTMLElement;
        target.setPointerCapture(event.pointerId);
        onSlideStart?.(event);
      })}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        const target = event.target as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) {
          onSlideMove?.(event);
        }
      })}
      onPointerUp={composeHandlers(onPointerUp, (event) => {
        const target = event.target as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) {
          target.releasePointerCapture(event.pointerId);
          onSlideEnd?.(event);
        }
      })}
    />
  );
};
