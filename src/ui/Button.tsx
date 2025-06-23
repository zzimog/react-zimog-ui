import type { ButtonHTMLAttributes, ElementType } from 'react';
import styled from '@/ui/styled';

export type ButtonProps = {
  as?: ElementType;
  label?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonRoot = styled.button({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '28px',
  minWidth: '28px',
  padding: '0 4px',
  font: 'inherit',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  outline: 0,
  cursor: 'pointer',
});

export const Button = (props: ButtonProps) => {
  const { label, type = 'button', ...buttonProps } = props;

  return (
    <ButtonRoot type={type} {...buttonProps}>
      {label}
    </ButtonRoot>
  );
};

export default Button;
