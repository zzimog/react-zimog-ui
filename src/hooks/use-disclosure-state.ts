import { useState } from 'react';

type DisclosureValue = string | string[];

type UseDisclosureStateOptions =
  | {
      multiple?: false;
      value?: string;
    }
  | {
      multiple: true;
      value?: string[];
    };

function useDisclosureState(options?: UseDisclosureStateOptions) {
  const { multiple, value: initialValue } = options || {};
  const init = initialValue || (multiple ? [] : '');

  const [value, setValue] = useState<DisclosureValue>(init);

  function handleValueChange(itemValue: string) {
    if (multiple) {
      if (!Array.isArray(value)) {
        return;
      }

      const newValue = value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue];

      setValue(newValue);
    } else {
      const isCurrent = itemValue === value;

      setValue(isCurrent ? '' : itemValue);
    }
  }

  return [value, handleValueChange];
}

export default useDisclosureState;
