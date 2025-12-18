import { type NativeProps, Native } from '../Native';
import { cn } from '../utils';
import classes from './tabsClasses';
import { useTabsContext } from './tabsContext';

export type TabsContentProps = NativeProps<'div'> & {
  value: string;
};

export const TabsContent = (inProps: TabsContentProps) => {
  const { value: valueProp, className, children, ...props } = inProps;

  const { baseId, value } = useTabsContext();
  const isActive = value === valueProp;

  const triggerId = `${baseId}-trigger-${valueProp}`;
  const itemId = `${baseId}-item-${valueProp}`;

  return (
    <Native.div
      id={itemId}
      role="tabpanel"
      aria-labelledby={triggerId}
      hidden={!isActive}
      className={cn(classes.content, className)}
      {...props}
    >
      {isActive && children}
    </Native.div>
  );
};
