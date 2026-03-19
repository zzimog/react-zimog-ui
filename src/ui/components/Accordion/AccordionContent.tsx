import { type NativeProps } from '@ui/headless';
import { Collapsible } from '@ui/components';
import { AccordionItem } from './AccordionItem';
import classes from './classes';

const DISPLAY_NAME = 'AccordionContent';

type BaseProps = NativeProps<'div'>;
type AccordionContentProps = BaseProps;

export const AccordionContent = (inProps: AccordionContentProps) => {
  const { children, ...props } = inProps;

  const { open } = AccordionItem.useContext(DISPLAY_NAME);

  return (
    <Collapsible open={open} {...props}>
      <div className={classes.content}>{children}</div>
    </Collapsible>
  );
};

AccordionContent.displayName = DISPLAY_NAME;
