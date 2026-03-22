import { useState, type PropsWithChildren } from 'react';
import { createScopedContext } from '@ui/utils';
import { PopperAnchor } from './PopperAnchor';
import { PopperContent } from './PopperContent';

const DISPLAY_NAME = 'Popper';

type PopperContextType = {
  anchor: HTMLElement | null;
  onAnchorChange(node: HTMLElement): void;
};

const [PopperContext, usePopperContext] = createScopedContext<
  PopperContextType | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type PopperProps = PropsWithChildren;

export const Popper = (props: PopperProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <PopperContext anchor={anchor} onAnchorChange={setAnchor} {...props} />
  );
};

Popper.displayName = DISPLAY_NAME;
Popper.useContext = usePopperContext;
Popper.Anchor = PopperAnchor;
Popper.Content = PopperContent;
