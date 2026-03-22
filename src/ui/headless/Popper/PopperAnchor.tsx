import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { Popper } from './Popper';

const DISPLAY_NAME = 'PopperAnchor';

type PopperAnchorProps = NativeProps<'div'>;

export const PopperAnchor = (inProps: PopperAnchorProps) => {
  const { ref: refProp, ...props } = inProps;

  const { onAnchorChange } = Popper.useContext(DISPLAY_NAME);
  const ref = useMergedRefs(refProp, onAnchorChange);

  return <Native.div ref={ref} {...props} />;
};

PopperAnchor.displayName = DISPLAY_NAME;
