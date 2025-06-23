import {
  type InputHTMLAttributes,
  type HTMLInputTypeAttribute,
  useId,
} from 'react';
import Button from '@/ui/Button';

export type FormFieldValue = string | number | boolean;

export type FormField = {
  label?: string;
  name: string;
  type: HTMLInputTypeAttribute | 'multi';
  value?: FormFieldValue | ((value?: FormFieldValue) => FormFieldValue);
  fields?: Array<FormField>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export type FormRow = Array<FormField>;

export type FormSchema = Array<FormRow | FormField>;

export type FormFieldData = {
  name: string;
  value: FormFieldValue | Array<FormFieldData>;
};

export type FormData = Array<FormFieldData>;

export type FormProps = {
  schema: FormSchema;
};

export const Form = (props: FormProps) => {
  const { schema } = props;
  const formId = useId();

  function parseForm(schema: FormSchema) {
    // eslint-disable-next-line
    function parseField(field: any, index: string | number) {
      const { label, name, type, value, fields, ...props } = field;
      const id = `${formId}_${name}`;

      const initValue = typeof value === 'function' ? value() : value;

      if (type === 'multi') {
        return (
          <div key={index} className="form-field form-field-multi">
            <pre>{JSON.stringify(fields, null, '  ')}</pre>
          </div>
        );
      }
      //<MultiInput key={index} fields={fields as MultiInputRow} />

      return (
        <div key={index} className="form-field">
          {label && <label htmlFor={id}>{label}</label>}
          <input id={id} name={name} value={initValue} type={type} {...props} />
        </div>
      );
    }

    return schema.map((item, index) => {
      if (Array.isArray(item)) {
        return (
          <div key={index} className="form-row">
            {item.map((field, fieldIndex) => {
              return parseField(field, `${index}_${fieldIndex}`);
            })}
          </div>
        );
      }

      return parseField(item, index);
    });
  }

  return (
    <div
      className="form"
      style={{
        width: '800px',
        margin: '0 auto',
        padding: '32px 0',
      }}
    >
      {parseForm(schema)}

      <div className="form-actions">
        <Button label="Submit" onClick={() => alert('submit form')} />
      </div>
    </div>
  );
};

export default Form;
