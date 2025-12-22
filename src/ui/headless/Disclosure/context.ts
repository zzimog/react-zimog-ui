import { createScopedContext } from '@ui/utils';

type DisclosureContextValue = {
  value: string[];
  onItemOpen(value: string): void;
  onItemClose(value: string): void;
};

const [DisclosureContext, useDisclosureContext] = createScopedContext<
  DisclosureContextValue | undefined
>('Disclosure', undefined);

type DisclosureItemContextValue = {
  value?: string;
};

const [DisclosureItemContext, useDisclosureItemContext] =
  createScopedContext<DisclosureItemContextValue>('DisclosureItem', {});

export {
  DisclosureContext,
  DisclosureItemContext,
  useDisclosureContext,
  useDisclosureItemContext,
};
