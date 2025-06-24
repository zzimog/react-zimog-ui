import {
  type HTMLAttributes,
  type InputHTMLAttributes,
  type HTMLInputTypeAttribute,
  useState,
} from 'react';
import clsx from 'clsx';
import { Button } from '@zui/elements';

export type MultiInputField = {
  label?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  defaultValue?: string | number | boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export type MultiInputRow = MultiInputField[];

export type MultiInputRowValue = Record<
  string,
  string | number | boolean | undefined
>;

export type MultiInputProps = {
  value?: MultiInputRowValue[];
  fields: MultiInputRow;
  onChange?: (value: MultiInputRowValue[]) => void;
} & HTMLAttributes<HTMLDivElement>;

export const MultiInput = (props: MultiInputProps) => {
  const { className, value: initValue = [], fields, onChange } = props;

  if (initValue.length === 0) {
    const emptyRow: MultiInputRowValue = {};

    fields.forEach((f, i) => {
      emptyRow[f.name || `field_0_${i}`] = f.defaultValue;
    });

    initValue.push(emptyRow);
  }

  const labels = fields.map((f) => f.label || f.name);
  const [value, setValue] = useState<MultiInputRowValue[]>(initValue);

  const addRow = () => {
    setValue((prev) => {
      const newRow = [...prev];
      const newRowValue: MultiInputRowValue = {};

      fields.forEach((f) => {
        newRowValue[f.name] = f.defaultValue;
      });

      newRow.push(newRowValue);
      return newRow;
    });
  };

  const deleteRow = (rowIndex: number) => {
    if (value.length === 1) {
      return;
    }

    if (confirm(`Are you sure to delete row?`)) {
      setValue((prev) => {
        const newValue = [...prev];
        newValue.splice(rowIndex, 1);
        return newValue;
      });
    }
  };

  const handleChange = (
    row: number,
    name: string,
    value: string | number | boolean | undefined
  ) => {
    setValue((prev) => {
      const newValue = [...prev];
      newValue[row][name] = value;

      if (onChange) {
        onChange(newValue);
      }

      return newValue;
    });
  };

  return (
    <div className={clsx(className, 'multi-input')}>
      <table>
        <thead>
          <tr>
            {labels.map((label, index) => {
              return <th key={index}>{label}</th>;
            })}
            <th>
              <Button label="+" onClick={addRow} />
            </th>
          </tr>
        </thead>
        <tbody>
          {value?.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {fields.map((field, fieldIndex) => {
                  const { name, placeholder, defaultValue, ...props } = field;
                  const value = row[name] || defaultValue;

                  // Remove label from input props
                  delete props.label;

                  if (typeof value === 'boolean') {
                    return undefined;
                  }

                  return (
                    <td key={fieldIndex}>
                      <input
                        {...props}
                        name={`${name}_${rowIndex}`}
                        value={value}
                        placeholder={placeholder || name}
                        onChange={(e) =>
                          handleChange(rowIndex, name, e.target.value)
                        }
                      />
                    </td>
                  );
                })}
                <td>
                  <Button
                    label="X"
                    disabled={value.length <= 1}
                    onClick={() => deleteRow(rowIndex)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
