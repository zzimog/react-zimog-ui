import { createContext } from 'react';

type ButtonGroupDirection = string | undefined;

const ButtonGroupContext = createContext<ButtonGroupDirection>(undefined);

export default ButtonGroupContext;
