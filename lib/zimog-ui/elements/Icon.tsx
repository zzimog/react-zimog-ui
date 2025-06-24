import clsx from 'clsx';
import { generateClasses, styled } from '../utils';
import '@fontsource-variable/material-symbols-rounded/wght.css';

const sizes: Record<string, number> = {
  small: 14,
  medium: 16,
  large: 20,
};

const classes = generateClasses('MaterialIcon', [
  'icon',
  ...Object.keys(sizes),
]);

export type IconProps = {
  name: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export const IconRoot = styled.span({
  fontFamily: 'Material Symbols Rounded Variable',
  color: 'inherit',

  ...Object.keys(sizes).reduce<Record<string, object>>((prev, size) => {
    prev[`&.${classes[size]}`] = {
      fontSize: `${sizes[size]}px`,
      lineHeight: '1em',
    };

    return prev;
  }, {}),
});

const Icon = (props: IconProps) => {
  const { name, size = 'medium', className } = props;

  return (
    <IconRoot className={clsx(classes.icon, classes[size], className)}>
      {name}
    </IconRoot>
  );
};

export default Icon;
