type EventHandler<E> = (event: E) => void;

export function composeHandlers<E extends { defaultPrevented: boolean }>(
  propHandler: EventHandler<E> | undefined,
  customHandler: EventHandler<E>,
  checkPrevented: boolean = false
) {
  return (event: E) => {
    propHandler?.(event);

    if (!checkPrevented || !event.defaultPrevented) {
      customHandler(event);
    }
  };
}
