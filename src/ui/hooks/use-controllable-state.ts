import {
  type Dispatch,
  type SetStateAction,
  useState,
  useCallback,
} from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;

type ControllableStateParams<T> = {
  prop?: T;
  defaultValue: T;
  onChange?: (state: T) => void;
};

export function useControllableState<T>(
  inParams: ControllableStateParams<T>
): [T, SetState<T>] {
  const { prop, defaultValue, onChange } = inParams;

  const [uncontrolled, setUncontrolled] = useState(defaultValue);

  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolled;

  const setValue = useCallback<SetState<T>>(
    (next) => {
      if (isControlled) {
        const value = isFunction(next) ? next(prop) : next;
        onChange?.(value);
      } else {
        setUncontrolled(next);
      }
    },
    [isControlled, onChange]
  );

  return [value, setValue];
}

function isFunction(value: unknown) {
  return typeof value === 'function';
}
