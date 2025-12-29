import {
  createContext,
  createElement,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';

export function createScopedContext<T extends object | undefined>(
  scopeName: string,
  defaultContext: T
) {
  const Context = createContext<T>(defaultContext);
  const Provider = (inProps: PropsWithChildren<T>) => {
    const { children, ...props } = inProps;
    const value = useMemo(() => props, Object.values(props)) as T;

    return createElement(Context.Provider, { value, children });
  };

  Context.displayName = scopeName + 'Context';
  Provider.displayName = scopeName + 'Provider';

  function useContextHook(consumerName: string) {
    const context = useContext(Context);

    if (context) {
      return context;
    } else if (defaultContext !== undefined) {
      return defaultContext;
    }

    throw new Error(
      `\`${consumerName}\` must be used within \`${scopeName}\` component.`
    );
  }

  return [Provider, useContextHook] as const;
}
