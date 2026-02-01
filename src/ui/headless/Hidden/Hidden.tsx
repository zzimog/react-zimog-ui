import type { CSSProperties } from 'react';
import { Native, type NativeProps } from '@ui/headless';

const styles: CSSProperties = {
  /**
   * @see https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
   */
  position: 'absolute',
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
};

type HiddenProps = NativeProps<'span'>;

export const Hidden = (inProps: HiddenProps) => {
  const { style, ...props } = inProps;
  return <Native.span {...props} style={{ ...styles, ...style }} />;
};
