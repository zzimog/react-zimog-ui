import type { PropsWithChildren } from 'react';

const DISPLAY_NAME = 'RadioGroupItem';

type RadioGroupItemProps = PropsWithChildren<{
  defaultValue?: string;
  value?: string;
  onValueChange?(value: string): void;
}>;

export const RadioGroupItem = (inProps: RadioGroupItemProps) => {
  const { children } = inProps;

  return <>{children}</>;
};

RadioGroupItem.displayName = DISPLAY_NAME;
