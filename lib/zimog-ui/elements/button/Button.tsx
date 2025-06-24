import { type ButtonHTMLAttributes, type ReactNode, useContext } from 'react';
import clsx from 'clsx';
import { styled, generateClasses } from '../../utils';
import ButtonGroupContext from './ButtonGroupContext';
import Halo from '../Halo';
import Icon from '../Icon';

const classes = generateClasses('Button', ['root', 'halo', 'icon']);

export type ButtonProps = {
  label?: ReactNode;
  icon?: string;
  iconBefore?: string;
  iconAfter?: string;
  halo?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonRoot = styled.button({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '28px',
  height: 36,
  padding: '0 12px',
  color: '#fff',
  background: '#242424',
  border: 0,
  borderRadius: '8px',
  font: 'inherit',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  outline: 0,
  cursor: 'pointer',

  [`&:active`]: {
    [`.${classes.halo}`]: {
      '--halo-size': '500px',
    },
  },

  [`.${classes.halo}`]: {
    '--halo-size': '100px',
    '--halo-opacity': 0.3,

    position: 'absolute',
    inset: 0,
  },

  [`&.${classes.icon}`]: {
    width: 36,
    padding: 0,
  },
});

const Button = (props: ButtonProps) => {
  const {
    label,
    icon,
    iconBefore,
    iconAfter,
    halo = true,
    type = 'button',
    className,
    ...other
  } = props;

  const groupContextClass = useContext(ButtonGroupContext);

  const iconBeforeName = iconBefore || icon;
  const iconOnly = icon && !label && !iconBefore && !iconAfter;

  return (
    <ButtonRoot
      type={type}
      className={clsx(
        classes.root,
        iconOnly && classes.icon,
        groupContextClass,
        className
      )}
      {...other}
    >
      {halo && <Halo className={classes.halo} />}
      {iconBeforeName && <Icon name={iconBeforeName} size="large" />}
      {label}
      {iconAfter && <Icon name={iconAfter} size="large" />}
    </ButtonRoot>
  );
};

export default Button;
