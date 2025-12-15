import {
  type PropsWithChildren,
  createContext,
  createElement,
  useContext,
  useMemo,
} from 'react';

export function createScopedContext<T>(scopeName: string, defaultContext: T) {
  const Context = createContext<T>(defaultContext);
  const name = `${scopeName}Context`;

  const Provider = (inProps: PropsWithChildren<T>) => {
    const { children, ...props } = inProps;

    const value = useMemo(() => props as T, Object.values(props));

    return createElement(Context, { value, children });
  };

  function useContextHook(componentName: string) {
    const context = useContext(Context);

    if (context) {
      return context;
    } else if (defaultContext !== undefined) {
      return defaultContext;
    }

    throw new Error(`${componentName} must be used within ${scopeName}`);
  }

  Context.displayName = name;
  Provider.displayName = name;

  return [Provider, useContextHook] as const;
}
