import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './cardClasses';

export type CardProps = PolyProps<typeof Poly.div> & {
  opticalCorrection?: 'top' | 'both';
};

export const Card = (inProps: CardProps) => {
  const { opticalCorrection, className, children, ...props } = inProps;

  const classNames = classes({ opticalCorrection });

  return (
    <Poly.div className={cn(classNames, className)} {...props}>
      {children}
    </Poly.div>
  );
};
