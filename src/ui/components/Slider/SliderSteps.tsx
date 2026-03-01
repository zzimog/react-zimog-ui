import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { Slider } from './Slider';

const DISPLAY_NAME = 'SliderSteps';

type SliderStepsProps = NativeProps<'span'>;

export const SliderSteps = (inProps: SliderStepsProps) => {
  const { className, ...props } = inProps;

  const { min, max, step, direction } = Slider.useContext(DISPLAY_NAME);

  const length = (max - min) / step + 1;
  const steps = Array.from({ length }).map((_, i) => {
    const value = i * step;
    const ratio = value / (max - min);
    return parseFloat(ratio.toFixed(10)) * 100;
  });

  return steps.map((step) => (
    <Native.span
      key={step}
      data-slider="step"
      data-direction={direction}
      {...props}
      className={cn(
        [
          'absolute',
          'bg-muted',
          'data-[direction=horizontal]:w-px',
          'data-[direction=horizontal]:h-4',
          'data-[direction=horizontal]:left-(--step)',
          'data-[direction=horizontal]:-top-1.5',
          'data-[direction=vertical]:w-4',
          'data-[direction=vertical]:h-px',
          'data-[direction=vertical]:bottom-(--step)',
          'data-[direction=vertical]:-left-1.5',
        ],
        className
      )}
      style={{
        ['--step' as string]: `${step}%`,
      }}
    />
  ));
};

SliderSteps.displayName = DISPLAY_NAME;
