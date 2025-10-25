import { createContext } from 'react';
import type { ButtonVariant, ButtonColor, ButtonSize } from './Button';

export type ButtonGroupContextType = {
  column?: boolean;
  joined?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
};

const ButtonGroupContext = createContext<ButtonGroupContextType>({});

export default ButtonGroupContext;
