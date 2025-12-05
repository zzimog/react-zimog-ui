import { type Context, createContext, useContext } from 'react';

export function createScopedContext<T>(
  scopeName: string,
  defaultValue: T
): [Context<T>, (componentName: string) => NonNullable<T>] {
  const provider = createContext<T>(defaultValue);

  function useHook(componentName: string) {
    const context = useContext(provider);

    if (!context) {
      throw new Error(`${componentName} must be used within ${scopeName}`);
    }

    return context;
  }

  return [provider, useHook];
}
