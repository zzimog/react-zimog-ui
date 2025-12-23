import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { MessageCircleWarning } from 'lucide-react';
import { Input } from '@ui/components';
import { cn } from '@ui/utils';
import { useFormContext } from './formContext';

type FormFieldState = 'valid' | 'invalid';

type FormFieldProps = Omit<ComponentPropsWithRef<'input'>, 'pattern'> & {
  label?: ReactNode;
  pattern?: RegExp;
};

const FormFieldContext = createContext<FormFieldState | undefined>(undefined);

export const FormField = (inProps: FormFieldProps) => {
  const {
    id: idProp,
    type = 'text',
    label,
    pattern,
    className,
    style,
    children,
    ...props
  } = inProps;

  const [state, setState] = useState<FormFieldState>('valid');

  const id = idProp || useId();
  const isCheck = type === 'checkbox' || type === 'radio';

  const { onValueChange } = useFormContext();

  const validate = useCallback(
    (value: string) => {
      if (!pattern) {
        return true;
      }

      const regex = new RegExp(pattern);
      return regex.test(value);
    },
    [pattern]
  );

  const inputRef = useCallback((node: HTMLInputElement) => {
    const { type, name } = node;
    const isCheck = type === 'checkbox' || type === 'radio';

    function handleChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target === node) {
        const value = isCheck ? target.checked : target.value;

        if (typeof value === 'string' && !validate(value)) {
          setState('invalid');
          return;
        } else {
          setState('valid');
        }

        onValueChange(name, value);
      }
    }

    node.addEventListener('change', handleChange);
    return () => node.removeEventListener('change', handleChange);
  }, []);

  return (
    <div
      role="group"
      className={cn(
        'relative',
        'flex',
        'flex-col',
        'gap-1',
        isCheck && 'pt-1 pl-7',
        className
      )}
      style={style}
    >
      {label && (
        <label htmlFor={id} className="inline-flex text-sm/6 font-bold">
          {label}
        </label>
      )}
      <Input
        ref={inputRef}
        id={id}
        type={type}
        data-state={state}
        className={cn(isCheck && 'absolute top-1.5 left-0 size-5')}
        {...props}
      />
      <FormFieldContext value={state}>{children}</FormFieldContext>
    </div>
  );
};

const FormFieldInvalid = (inProps: ComponentPropsWithRef<'p'>) => {
  const { className, children, ...props } = inProps;

  const state = useContext(FormFieldContext);
  const shouldRender = !state || state === 'invalid';

  return (
    shouldRender && (
      <p
        className={cn('pl-5', 'text-sm/5', 'text-danger', className)}
        {...props}
      >
        <MessageCircleWarning className="float-left my-0.5 -ml-5 size-4" />
        {children}
      </p>
    )
  );
};

const FormFieldText = (inProps: ComponentPropsWithRef<'p'>) => {
  const { className, ...props } = inProps;

  return (
    <p
      className={cn(
        'text-sm',
        'text-muted-foreground',
        'dark:text-muted-background',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
};

FormField.displayName = 'FormField';
FormFieldInvalid.displayName = 'FormFieldInvalid';
FormFieldText.displayName = 'FormFieldText';
FormField.Invalid = FormFieldInvalid;
FormField.Text = FormFieldText;
