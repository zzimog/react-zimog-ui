import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;

type ControllableStateParams<T> = {
  defaultProp: T;
  prop?: T;
  onChange?: (state: T) => void;
};

function isFunction(value: unknown) {
  return typeof value === 'function';
}

export function useControllableState<T>(
  inParams: ControllableStateParams<T>
): [T, SetState<T>] {
  const { prop, defaultProp, onChange } = inParams;

  const [uncontrolled, setUncontrolled] = useState(defaultProp);

  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolled;

  const setValue = useCallback<SetState<T>>(
    (next) => {
      const nextValue = isFunction(next) ? next(value) : next;

      onChange?.(nextValue);

      if (!isControlled) {
        setUncontrolled(nextValue);
      }
    },
    [isControlled, value, onChange]
  );

  return [value, setValue];
}
