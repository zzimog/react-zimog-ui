import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

type TitleProps = NativeProps<'h1'> & {
  size?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Title = (inProps: TitleProps) => {
  const { size = 1, className, ...props } = inProps;

  const Comp = Native[`h${size}`];

  return <Comp className={cn(classes({ size }), className)} {...props} />;
};
