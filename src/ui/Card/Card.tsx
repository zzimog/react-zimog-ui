import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';

export const Card = (inProps: PolyProps<'div'>) => {
  const { className, ...props } = inProps;

  return (
    <Poly.div
      className={cn(
        [
          'flex',
          'flex-col',
          'gap-3',
          'py-6',
          'rounded-shape',
          'border',
          'transition-colors',
          'overflow-hidden',
          'border-border',
          'text-foreground',
          'bg-background',
          'dark:text-background',
          'dark:bg-foreground',
        ],
        className
      )}
      {...props}
    />
  );
};

Card.displayName = 'Card';

/*---------------------------------------------------------------------------*/

const CardHeader = (inProps: PolyProps<'div'>) => {
  const { className, ...props } = inProps;

  return (
    <Poly.div
      className={cn(
        'flex',
        'flex-col',
        'gap-2',
        'mx-6',
        'pb-3',
        'border-b',
        'border-border',
        className
      )}
      {...props}
    />
  );
};

CardHeader.displayName = 'CardHeader';

/*---------------------------------------------------------------------------*/

const CardTitle = (inProps: PolyProps<'div'>) => {
  const { className, ...props } = inProps;

  return (
    <Poly.div
      className={cn('font-bold', 'text-lg/none', className)}
      {...props}
    />
  );
};

CardTitle.displayName = 'CardTitle';

/*---------------------------------------------------------------------------*/

const CardDescription = (inProps: PolyProps<'div'>) => {
  const { className, ...props } = inProps;

  return (
    <Poly.div
      className={cn('text-sm', 'text-muted', 'transition-colors', className)}
      {...props}
    />
  );
};

CardDescription.displayName = 'CardDescription';

/*---------------------------------------------------------------------------*/

const CardContent = (inProps: PolyProps<'div'>) => {
  const { className, ...props } = inProps;

  return <Poly.div className={cn('px-6', className)} {...props} />;
};

CardContent.displayName = 'CardContent';

/*---------------------------------------------------------------------------*/

const CardFooter = (inProps: PolyProps<'div'>) => {
  const { className, ...props } = inProps;

  return (
    <Poly.div
      className={cn(
        'flex',
        'flex-col',
        'gap-2',
        'mx-6',
        'pt-3',
        'border-t',
        'border-border',
        'text-muted',
        'text-sm',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
};

CardFooter.displayName = 'CardFooter';

/*---------------------------------------------------------------------------*/

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
