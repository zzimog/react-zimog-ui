import { useContext } from 'react';
import DisclosureContext from './disclosureContext';

type UseDisclosureOptions = {
  valueProp: string;
};

function useDisclosure(options: UseDisclosureOptions) {
  const { valueProp } = options;

  const context = useContext(DisclosureContext);

  if (!context) {
    throw new Error('useDisclosure must be used inside DisclosureContext');
  }

  const { baseId, value, setValue } = context;

  const triggerId = `${baseId}-trigger-${valueProp}`;
  const contentId = `${baseId}-content-${valueProp}`;

  const isActive = valueProp
    ? Array.isArray(value)
      ? value.includes(valueProp)
      : value === valueProp
    : undefined;

  return {
    baseId,
    triggerId,
    contentId,
    value,
    isActive,
    setValue,
  };
}

export default useDisclosure;
