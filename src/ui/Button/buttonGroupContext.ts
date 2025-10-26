import { createContext } from 'react';
import type { ButtonVariant, ButtonColor, ButtonSize } from './Button';

type ButtonGroupContextType = {
  column?: boolean;
  joined?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
};

export const ButtonGroupContext = createContext<
  ButtonGroupContextType | undefined
>(undefined);
