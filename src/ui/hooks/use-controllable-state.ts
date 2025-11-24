import {
  type Dispatch,
  type SetStateAction,
  useState,
  useCallback,
} from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;

type ControllableStateParams<T> = {
  defaultValue: T;
  prop?: T;
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
        if (value !== uncontrolled) {
          onChange?.(value);
          setUncontrolled(value);
        }
      } else {
        setUncontrolled(next);
      }
    },
    [prop, isControlled, onChange]
  );

  return [value, setValue];
}

function isFunction(value: unknown) {
  return typeof value === 'function';
}
