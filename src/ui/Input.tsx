import { useId, type InputHTMLAttributes } from 'react';
import styled from './styled';

export type InputProps = {
  label?: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputRoot = styled.input({
  fontSize: '14px',
  outline: 0,
});

export const Input = (props: InputProps) => {
  const { label, id, ...inputProps } = props;
  const generatedId = useId() + inputProps.name;

  return (
    <InputRoot>
      {label && <label htmlFor={id || generatedId}>{label}</label>}
      <input id={id || generatedId} {...inputProps} />
    </InputRoot>
  );
};

export default Input;
