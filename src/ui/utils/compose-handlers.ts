import type { SyntheticEvent } from 'react';

type EventHandler<E> = (event: E) => void;

export function composeHandlers<E extends SyntheticEvent | Event>(
  propHandler: EventHandler<E> | undefined,
  customHandler: EventHandler<E>,
  checkPrevented: boolean = true
): EventHandler<E> {
  return (event: E) => {
    propHandler?.(event);

    if (!checkPrevented || !event.defaultPrevented) {
      customHandler(event);
    }
  };
}
