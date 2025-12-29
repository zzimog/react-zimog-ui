import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from 'react';

type SelectContextValue = {
  value: string;
  setSelected(value: string, node: HTMLElement): void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const SelectContext = createContext<SelectContextValue | undefined>(
  undefined
);

export function useSelectContext() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('useSelectContext must be used within SelectContext');
  }

  return context;
}
