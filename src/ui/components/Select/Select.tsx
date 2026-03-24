import {
  useEffect,
  useId,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { BubbleInput, Popper } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createCollection, createScopedContext } from '@ui/utils';
import { SelectContent } from './SelectContent';
import { SelectGroup } from './SelectGroup';
import { SelectLegend } from './SelectLegend';
import { SelectOption } from './SelectOption';
import { SelectTrigger } from './SelectTrigger';
import { SelectValue } from './SelectValue';

const DISPLAY_NAME = 'Select';

type OptionElement = ReactElement<'option'>;

type SelectContextValue = {
  baseId: string;
  contentId: string;
  required: boolean;
  disabled: boolean;
  value: string;
  open: boolean;
  activeId?: string;
  valueNode: HTMLElement | null;
  content: HTMLElement | null;
  onValueChange(value: string): void;
  onOpenChange(open: boolean): void;
  onValueNodeChange(element: HTMLElement | null): void;
  onContentChange(element: HTMLElement | null): void;
  onActiveIdChange(value?: string): void;
  onOptionAdd(option: OptionElement): void;
  onOptionRemove(option: OptionElement): void;
};

const [SelectContext, useSelectContext] = createScopedContext<
  SelectContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SelectOptionData = {
  node: HTMLElement;
  value: string;
  selected?: boolean;
  disabled?: boolean;
};

const [SelectCollection, useSelectCollection] =
  createCollection<SelectOptionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type BaseTriggerProps = ComponentPropsWithoutRef<typeof SelectTrigger>;
type BaseValueProps = ComponentPropsWithoutRef<typeof SelectValue>;
type BaseProps = BaseTriggerProps & BaseValueProps;
type SelectProps = BaseProps & {
  required?: boolean;
  defaultValue?: string;
  defaultOpen?: boolean;
  value?: string;
  open?: boolean;
  onValueChange?(value: string): void;
  onOpenChange?(open: boolean): void;
  onChange?(event: ChangeEvent<HTMLSelectElement>): void;
};

export const Select = (inProps: SelectProps) => {
  const {
    defaultValue = '',
    defaultOpen = false,
    value: valueProp,
    open: openProp,
    name,
    required = false,
    disabled = false,
    placeholder,
    children,
    onValueChange,
    onOpenChange,
    onChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    prop: openProp,
    onChange: onOpenChange,
  });

  const [valueNode, setValueNode] = useState<HTMLElement | null>(null);
  const [content, setContent] = useState<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState<string | undefined>();
  const [options, setOptions] = useState<Set<OptionElement>>(new Set());

  const baseId = useId();
  const contentId = `${baseId}-content`;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setActiveId(undefined);
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('scroll', close);
    return () => window.removeEventListener('scroll', close);
  }, [setOpen]);

  return (
    <SelectContext
      baseId={baseId}
      contentId={contentId}
      required={required}
      disabled={disabled}
      value={value}
      open={open}
      valueNode={valueNode}
      content={content}
      activeId={activeId}
      onValueChange={setValue}
      onOpenChange={setOpen}
      onValueNodeChange={setValueNode}
      onContentChange={setContent}
      onActiveIdChange={setActiveId}
      onOptionAdd={(option) => {
        setOptions((prev) => {
          const newSet = new Set(prev);
          return newSet.add(option);
        });
      }}
      onOptionRemove={(option) => {
        setOptions((prev) => {
          const newSet = new Set(prev);
          newSet.delete(option);
          return newSet;
        });
      }}
    >
      <SelectCollection>
        <Popper>
          <SelectTrigger {...props}>
            <SelectValue placeholder={placeholder} />
            <ChevronDown />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Popper>
      </SelectCollection>
      <BubbleInput.Select
        aria-label={name}
        value={value}
        name={name}
        required={required}
        disabled={disabled}
        onChange={onChange}
      >
        {Array.from(options)}
      </BubbleInput.Select>
    </SelectContext>
  );
};

Select.displayName = DISPLAY_NAME;
Select.useContext = useSelectContext;
Select.useCollection = useSelectCollection;
Select.Content = SelectContent;
Select.Group = SelectGroup;
Select.Legend = SelectLegend;
Select.Option = SelectOption;
Select.Trigger = SelectTrigger;
Select.Value = SelectValue;
