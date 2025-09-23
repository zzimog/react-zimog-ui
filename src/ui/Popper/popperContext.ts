import { createContext } from 'react';
import type { PopperObject } from '../hooks/usePopper';

const PopperContext = createContext<PopperObject | undefined>(undefined);

export default PopperContext;
