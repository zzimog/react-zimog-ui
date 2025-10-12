import { createContext } from 'react';
import type { PopperObject } from '../hooks/usePopper';

const PopperContext = createContext<
  PopperObject<HTMLElement, HTMLElement> | undefined
>(undefined);

export default PopperContext;
