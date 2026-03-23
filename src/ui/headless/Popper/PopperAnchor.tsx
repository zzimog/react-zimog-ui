import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { Popper } from './Popper';

const DISPLAY_NAME = 'PopperAnchor';

type BaseProps = NativeProps<'div'>;
type PopperAnchorProps = BaseProps;

export const PopperAnchor = (inProps: PopperAnchorProps) => {
  const { ref: refProp, ...props } = inProps;

  const { onAnchorChange } = Popper.useContext(DISPLAY_NAME);
  const mergedRef = useMergedRefs(refProp, onAnchorChange);

  return <Native.div ref={mergedRef} {...props} />;
};

PopperAnchor.displayName = DISPLAY_NAME;
