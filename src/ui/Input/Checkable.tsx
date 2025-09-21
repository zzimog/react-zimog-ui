import type { InputHTMLAttributes } from 'react';
import { cn } from '@ui/utils';
import { checkboxClasses, radioClasses } from './inputClasses';

export type CheckableProps = {
  type?: 'checkbox' | 'radio' | (string & {});
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkable = (inProps: CheckableProps) => {
  const { type = 'checkbox', className, ...props } = inProps;

  const classes = type === 'checkbox' ? checkboxClasses : radioClasses;

  return (
    <div className={cn(classes.box, className)}>
      <div className={cn(classes.mark)} />
      <input type={type} className={cn(classes.input)} {...props} />
    </div>
  );
};
