import { type ReactNode, StrictMode } from 'react';
import { cn } from '@ui';

type AppContainerProps = {
  strict?: boolean;
  children?: ReactNode;
};

const classes = cn(['h-screen', 'flex', 'justify-center', 'items-start']);

const AppContainer = (props: AppContainerProps) => {
  const { strict, ...rest } = props;
  const content = <div className={classes} {...rest} />;

  if (strict) {
    return <StrictMode>{content}</StrictMode>;
  }

  return content;
};

export default AppContainer;
