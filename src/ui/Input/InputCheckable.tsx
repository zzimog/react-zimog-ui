import type { InputHTMLAttributes, Ref } from 'react';
import { cn } from '@ui/utils';
import { checkboxClasses, radioClasses } from './inputClasses';

export type CheckableProps = {
  ref?: Ref<HTMLInputElement>;
  type?: 'checkbox' | 'radio' | (string & {});
} & InputHTMLAttributes<HTMLInputElement>;

export const InputCheckable = (inProps: CheckableProps) => {
  const { type = 'checkbox', className, ref, ...props } = inProps;

  const classes = type === 'checkbox' ? checkboxClasses : radioClasses;

  return (
    <div className={cn(classes.box, className)}>
      <div className={cn(classes.mark)} />
      <input ref={ref} type={type} className={cn(classes.input)} {...props} />
    </div>
  );
};
