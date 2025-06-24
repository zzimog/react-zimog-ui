import { type HTMLAttributes, useContext, useState } from 'react';
import clsx from 'clsx';
import { styled, generateClasses, getChildren } from '../../utils';
import useOutsideClick from '../../hooks/useOutsideClick';
import ButtonGroupContext from './ButtonGroupContext';
import Button from './Button';

export type ButtonGroupProps = {
  direction?: 'row' | 'column';
} & HTMLAttributes<HTMLDivElement>;

const classes = generateClasses('ButtonGroup', [
  'root',
  'row',
  'column',
  'buttonFirst',
  'buttonMiddle',
  'buttonLast',
  'dropdownRoot',
  'dropdown',
]);

const ButtonGroupRoot = styled.div({
  display: 'inline-flex',
  flexWrap: 'nowrap',
  gap: 1,

  [`&.${classes.dropdownRoot}`]: {
    position: 'relative',

    [`.${classes.dropdown}`]: {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: 4,
      padding: 8,
      borderRadius: 8,
      background: 'red',
    },
  },

  [`&.${classes.row}`]: {
    flexDirection: 'row',

    [`.${classes.buttonFirst}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    [`.${classes.buttonMiddle}`]: {
      borderLeft: 0,
      borderRadius: 0,
    },

    [`.${classes.buttonLast}`]: {
      borderLeft: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },

  [`&.${classes.column}`]: {
    flexDirection: 'column',

    [`.${classes.buttonFirst}`]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },

    [`.${classes.buttonMiddle}`]: {
      borderTop: 0,
      borderRadius: 0,
    },

    [`.${classes.buttonLast}`]: {
      borderTop: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
});

const ButtonGroup = (props: ButtonGroupProps) => {
  const { className, direction = 'row', children, ...other } = props;
  const groupContext = useContext(ButtonGroupContext);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const isDropdown = !!groupContext;

  const dropdownRef = useOutsideClick<HTMLDivElement>(() => {
    setDropdownOpen(false);
  }, dropdownOpen);

  const validChildren = getChildren(children);
  const childrenLength = validChildren.length;

  function getButtonClass(index: number) {
    const isFirst = index === 0;
    const isLast = index === childrenLength - 1;

    return clsx([
      isFirst && classes.buttonFirst,
      isLast && classes.buttonLast,
      !isFirst && !isLast && classes.buttonMiddle,
    ]);
  }

  if (isDropdown) {
    return (
      <ButtonGroupRoot
        ref={dropdownRef}
        className={clsx(classes.dropdownRoot, className)}
      >
        <Button
          icon="arrow_drop_down"
          onClick={() => setDropdownOpen((o) => !o)}
        />

        {dropdownOpen && (
          <div className={clsx(classes.dropdown)}>
            <ButtonGroupRoot
              role="group"
              className={clsx(classes.root, classes.column)}
            >
              {validChildren.map((child, index) => {
                return (
                  <ButtonGroupContext key={index} value={getButtonClass(index)}>
                    {child}
                  </ButtonGroupContext>
                );
              })}
            </ButtonGroupRoot>
          </div>
        )}
      </ButtonGroupRoot>
    );
  }

  return (
    <ButtonGroupRoot
      role="group"
      className={clsx(classes.root, classes[direction], className)}
      {...other}
    >
      {validChildren.map((child, index) => {
        return (
          <ButtonGroupContext key={index} value={getButtonClass(index)}>
            {child}
          </ButtonGroupContext>
        );
      })}
    </ButtonGroupRoot>
  );
};

export default ButtonGroup;
