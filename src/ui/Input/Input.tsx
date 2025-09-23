import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../utils';
import { textboxClasses as classes } from './inputClasses';
import { InputCheckable } from './InputCheckable';

export type InputProps = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'>;

function createAddon(content: ReactNode, type: 'prefix' | 'suffix') {
  return (
    content && (
      <div
        className={cn(classes.addon.root, classes.addon[type])}
        children={content}
      />
    )
  );
}

export const Input = (inProps: InputProps) => {
  const { type, prefix, suffix, className, ref, ...props } = inProps;

  if (type === 'checkbox' || type === 'radio') {
    return <InputCheckable type={type} className={className} {...props} />;
  }

  if (prefix || suffix) {
    return (
      <div className={cn(classes.group, className)}>
        {createAddon(prefix, 'prefix')}

        <input
          ref={ref}
          type={type}
          className={cn(
            classes.input.root,
            prefix && classes.input.prefix,
            suffix && classes.input.suffix
          )}
          {...props}
        />

        {createAddon(suffix, 'suffix')}
      </div>
    );
  }

  return (
    <input
      ref={ref}
      type={type}
      className={cn(classes.input.root, className)}
      {...props}
    />
  );
};
