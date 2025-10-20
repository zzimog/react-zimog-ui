/**
 * @todo Refactor
 */
import { poly } from '../../ui/polymorphic';
import { usePresence, useMergedRefs } from '../../ui/hooks';
import { cn } from '../../ui/utils';
import { cva } from 'class-variance-authority';

const classes = cva('rounded-shape transition-all duration-250 bg-highlight', {
  variants: {
    persistent: {
      true: null,
      false: [
        'data-[state="visible"]:animate-fade-in',
        'data-[state="hidden"]:animate-fade-out',
      ],
    },
  },
  defaultVariants: {
    persistent: false,
  },
});

export type HighlightHighlighterProps = {
  visible?: boolean;
  persistent?: boolean;
};

export const HighlightHighlighter = poly.div<HighlightHighlighterProps>(
  (Tag, inProps) => {
    const {
      ref: refProp,
      visible = true,
      persistent,
      className,
      ...props
    } = inProps;

    const { ref: refPresence, present } = usePresence(persistent || visible);
    const mergedRefs = useMergedRefs(refProp, refPresence);

    return (
      <Tag
        ref={mergedRefs}
        data-state={visible ? 'visible' : 'hidden'}
        className={cn(classes({ persistent }), className)}
        hidden={!present}
        {...props}
      />
    );
  }
);
