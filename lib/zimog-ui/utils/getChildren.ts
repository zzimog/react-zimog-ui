import {
  type ReactNode,
  type ReactElement,
  Children,
  isValidElement,
} from 'react';

function getChildren(children: ReactNode = []) {
  return Children.toArray(children).filter((child) => {
    return isValidElement(child);
  }) as ReactElement<unknown>[];
}

export default getChildren;
