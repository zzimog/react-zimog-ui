import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { Slider } from './Slider';

const DISPLAY_NAME = 'SliderTrack';

type SliderTrackProps = NativeProps<'span'>;

export const SliderTrack = (inProps: SliderTrackProps) => {
  const { className, ...props } = inProps;

  const { direction } = Slider.useContext(DISPLAY_NAME);

  return (
    <Native.span
      data-slider="track"
      data-direction={direction}
      {...props}
      className={cn(
        [
          'relative',
          'bg-muted',
          'grow',
          'data-[direction=horizontal]:h-1',
          'data-[direction=vertical]:w-1',
        ],
        className
      )}
    />
  );
};

SliderTrack.displayName = DISPLAY_NAME;
