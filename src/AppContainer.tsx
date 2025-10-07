import { cn } from '@ui';
import { type ReactNode, StrictMode } from 'react';

type AppContainerProps = {
  strict?: boolean;
  children?: ReactNode;
};

const classes = cn(['h-screen', 'flex', 'justify-center', 'items-center']);

const AppContainer = (props: AppContainerProps) => {
  const { strict, ...rest } = props;
  const content = <div className={classes} {...rest} />;

  if (strict) {
    return <StrictMode>{content}</StrictMode>;
  }

  return content;
};

export default AppContainer;
