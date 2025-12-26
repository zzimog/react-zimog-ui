import { Highlight, type NativeProps } from '@ui/headless';
import { cn, createScopedContext } from '@ui/utils';
import classes from './classes';

const DISPLAY_NAME = 'TabsList';

const [TabsListContext, useTabsListContext] = createScopedContext<
  {} | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type TabsListProps = NativeProps<'div'>;

export const TabsList = (inProps: TabsListProps) => {
  const { className, children, ...props } = inProps;

  return (
    <Highlight {...props} className={cn(classes.list, className)}>
      <Highlight.Indicator className={classes.highlight} />
      <TabsListContext>{children}</TabsListContext>
    </Highlight>
  );
};

TabsList.displayName = DISPLAY_NAME;
TabsList.useContext = useTabsListContext;
