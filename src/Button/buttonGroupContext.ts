import { createContext } from 'react';
import type { ButtonVariant, ButtonColor, ButtonSize } from './Button';

export type ButtonGroupContextType = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
};

const ButtonGroupContext = createContext<ButtonGroupContextType>({});

export default ButtonGroupContext;
