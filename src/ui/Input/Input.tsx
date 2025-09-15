import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';
import { inputGroupClasses, inputClasses, addonClasses } from './inputClasses';

export type InputProps = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  pippo?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'>;

export const Input = (inProps: InputProps) => {
  const { type, prefix, suffix, className, ...props } = inProps;

  if (type === 'checkbox') {
    return <h1>CHECKBOX</h1>;
  }

  if (prefix || suffix) {
    return (
      <div
        className={cn(
          inputGroupClasses({
            prefix: !!prefix,
            suffix: !!suffix,
          }),
          className
        )}
      >
        {prefix && (
          <div className={addonClasses({ type: 'prefix' })}>{prefix}</div>
        )}

        <input type={type} className={inputClasses()} {...props} />

        {suffix && (
          <div className={addonClasses({ type: 'suffix' })}>{suffix}</div>
        )}
      </div>
    );
  }

  return (
    <input type={type} className={cn(inputClasses(), className)} {...props} />
  );
};
