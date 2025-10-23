import { poly } from '../polymorphic';
import { cn } from '../utils';
import { useTabsContext } from './tabsContext';
import classes from './tabsClasses';

export type TabsContentProps = {
  value: string;
};

export const TabsContent = poly.div<TabsContentProps>((Tag, inProps) => {
  const { value: valueProp, className, children, ...props } = inProps;

  const { baseId, value } = useTabsContext();

  const triggerId = `${baseId}-trigger-${valueProp}`;
  const itemId = `${baseId}-item-${valueProp}`;

  const isActive = value === valueProp;

  return (
    <Tag
      id={itemId}
      role="tabpanel"
      aria-labelledby={triggerId}
      hidden={!isActive}
      className={cn(classes.content, className)}
      {...props}
    >
      {isActive && children}
    </Tag>
  );
});
