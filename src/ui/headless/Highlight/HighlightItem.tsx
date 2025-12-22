import { useCallback } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { useHighlightContext } from './context';

const DISPLAY_NAME = 'HighlightItem';

export type HighlightItemProps = NativeProps<'div'> & {
  selected?: boolean;
  disabled?: boolean;
};

export const HighlightItem = (inProps: HighlightItemProps) => {
  const { ref: refProp, selected, disabled, ...props } = inProps;

  const { type, leaveMode, onCurrentChange } =
    useHighlightContext(DISPLAY_NAME);

  const ref = useCallback((node: HTMLElement) => {
    if (disabled) {
      return;
    }

    function handleEnable() {
      onCurrentChange(node);
    }

    function handleDisable(event: Event) {
      if (leaveMode === 'items' && node === event.target) {
        onCurrentChange(null);
      }
    }

    if (selected) {
      if (leaveMode === 'none') {
        handleEnable();
      }
    }

    switch (type) {
      case 'click':
        node.addEventListener('click', handleEnable);
        return () => node.removeEventListener('click', handleEnable);

      case 'focus':
        node.addEventListener('focusin', handleEnable);
        node.addEventListener('focusout', handleDisable);
        return () => {
          node.removeEventListener('focusin', handleEnable);
          node.removeEventListener('focusout', handleDisable);
        };

      case 'hover':
        node.addEventListener('pointerover', handleEnable);
        node.addEventListener('pointerleave', handleDisable);
        return () => {
          node.removeEventListener('pointerover', handleEnable);
          node.removeEventListener('pointerleave', handleDisable);
        };
    }
  }, []);

  const mergedRefs = useMergedRefs(refProp, ref);

  return <Native.div ref={mergedRefs} {...props} />;
};

HighlightItem.displayName = DISPLAY_NAME;
