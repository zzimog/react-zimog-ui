import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import { useTabsContext } from './tabsContext';
import classes from './tabsClasses';

export type TabsContentProps = PolyProps<typeof Poly.div> & {
  value: string;
};

export const TabsContent = (inProps: TabsContentProps) => {
  const { value: valueProp, className, children, ...props } = inProps;

  const { baseId, value } = useTabsContext();

  const triggerId = `${baseId}-trigger-${valueProp}`;
  const itemId = `${baseId}-item-${valueProp}`;

  const isActive = value === valueProp;

  return (
    <Poly.div
      id={itemId}
      role="tabpanel"
      aria-labelledby={triggerId}
      hidden={!isActive}
      className={cn(classes.content, className)}
      {...props}
    >
      {isActive && children}
    </Poly.div>
  );
};
