import { createScopedContext } from '../utils';

type DisclosureContextValue = {
  value: string[];
  onItemOpen(value: string): void;
  onItemClose(value: string): void;
};

const [DisclosureContext, useDisclosureContext] = createScopedContext<
  DisclosureContextValue | undefined
>('Disclosure', undefined);

export { DisclosureContext, useDisclosureContext };
