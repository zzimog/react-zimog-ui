import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './titleClasses';

type TitleProps = PolyProps<'h1'> & {
  size?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Title = (inProps: TitleProps) => {
  const { size = 1, className, ...props } = inProps;

  const Comp = Poly[`h${size}`];

  return <Comp className={cn(classes({ size }), className)} {...props} />;
};
