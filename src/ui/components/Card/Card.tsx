import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

export const Card = (inProps: NativeProps<'div'>) => {
  const { className, ...props } = inProps;

  return <Native.div {...props} className={cn(classes.root, className)} />;
};

Card.displayName = 'Card';

/*---------------------------------------------------------------------------*/

const CardHeader = (inProps: NativeProps<'div'>) => {
  const { className, ...props } = inProps;

  return <Native.div {...props} className={cn(classes.header, className)} />;
};

CardHeader.displayName = 'CardHeader';
Card.Header = CardHeader;

/*---------------------------------------------------------------------------*/

const CardTitle = (inProps: NativeProps<'div'>) => {
  const { className, ...props } = inProps;

  return <Native.div {...props} className={cn(classes.title, className)} />;
};

CardTitle.displayName = 'CardTitle';
Card.Title = CardTitle;

/*---------------------------------------------------------------------------*/

const CardDescription = (inProps: NativeProps<'div'>) => {
  const { className, ...props } = inProps;

  return (
    <Native.div {...props} className={cn(classes.description, className)} />
  );
};

CardDescription.displayName = 'CardDescription';
Card.Description = CardDescription;

/*---------------------------------------------------------------------------*/

const CardContent = (inProps: NativeProps<'div'>) => {
  const { className, ...props } = inProps;

  return <Native.div {...props} className={cn(classes.content, className)} />;
};

CardContent.displayName = 'CardContent';
Card.Content = CardContent;

/*---------------------------------------------------------------------------*/

const CardFooter = (inProps: NativeProps<'div'>) => {
  const { className, ...props } = inProps;

  return <Native.div {...props} className={cn(classes.footer, className)} />;
};

CardFooter.displayName = 'CardFooter';
Card.Footer = CardFooter;
