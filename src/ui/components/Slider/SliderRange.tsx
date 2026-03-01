import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { Slider } from './Slider';

const DISPLAY_NAME = 'SliderRange';

type SliderRangeProps = NativeProps<'span'>;

export const SliderRange = (inProps: SliderRangeProps) => {
  const { className, style, ...props } = inProps;

  const { ratio, direction } = Slider.useContext(DISPLAY_NAME);

  return (
    <Native.span
      data-slider="range"
      data-direction={direction}
      {...props}
      className={cn(
        [
          'absolute',
          'bg-primary',
          'data-[direction=horizontal]:h-full',
          'data-[direction=horizontal]:left-(--start)',
          'data-[direction=horizontal]:right-(--end)',
          'data-[direction=vertical]:w-full',
          'data-[direction=vertical]:top-(--end)',
          'data-[direction=vertical]:bottom-(--start)',
        ],
        className
      )}
      style={{
        ['--start' as string]: '0%',
        ['--end' as string]: `${(1 - ratio) * 100}%`,
      }}
    />
  );
};

SliderRange.displayName = DISPLAY_NAME;
