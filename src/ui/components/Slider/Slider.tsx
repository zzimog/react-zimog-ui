import { useCallback, useRef, useState, type PointerEvent } from 'react';
import { Interactive, type NativeProps } from '@ui/headless';
import { useControllableState, useMergedRefs } from '@ui/hooks';
import { clamp, cn, composeHandlers, createScopedContext } from '@ui/utils';
import { SliderRange } from './SliderRange';
import { SliderSteps } from './SliderSteps';
import { SliderThumb } from './SliderThumb';
import { SliderTrack } from './SliderTrack';

const DISPLAY_NAME = 'Slider';

type SliderDirection = 'horizontal' | 'vertical';

type SliderContextValue = {
  min: number;
  max: number;
  step: number;
  direction: SliderDirection;
  value: number;
  ratio: number;
  onThumbChange(element: HTMLElement): void;
};

const [SliderContext, useSliderContext] = createScopedContext<
  SliderContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SliderProps = NativeProps<'div'> & {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  direction?: SliderDirection;
  onValueChange?(value: number): void;
};

export const Slider = (inProps: SliderProps) => {
  const {
    ref: refProp,
    value: valueProp,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    direction = 'horizontal',
    className,
    style,
    onValueChange,
    onContextMenu,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const [thumb, setThumb] = useState<HTMLElement | null>(null);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const clampedValue = clamp(value, min, max);
  const ratio = (clampedValue - min) / (max - min);

  const updateValue = useCallback(
    (value: number) => {
      const newValue = clamp(value, min, max);
      setValue(newValue);
    },
    [min, max]
  );

  const getValueFromRatio = useCallback(
    (ratio: number) => {
      const getSteppedRatio = (ratio: number) => {
        const steps = (max - min) / step;
        const current = Math.round(ratio * steps);
        const steppedRatio = clamp(current / steps, 0, 1);
        return parseFloat(steppedRatio.toFixed(10));
      };

      const steppedRatio = getSteppedRatio(ratio);
      const value =
        min + Math.round((steppedRatio * (max - min)) / step) * step;

      return value;
    },
    [min, max, step]
  );

  const handleSlide = useCallback(
    (event: PointerEvent) => {
      const node = ref.current;
      if (node && thumb) {
        const rect = node.getBoundingClientRect();
        let value: number;

        if (direction === 'horizontal') {
          const { left, right, width } = rect;
          const delta = clamp(event.clientX, left, right) - left;
          value = getValueFromRatio(delta / width);
        } else {
          const { top, bottom, height } = rect;
          const delta = bottom - clamp(event.clientY, top, bottom);
          value = getValueFromRatio(delta / height);
        }

        updateValue(value);
        thumb.focus();
      }

      event.preventDefault();
    },
    [direction, thumb]
  );

  return (
    <SliderContext
      min={min}
      max={max}
      step={step}
      value={value}
      ratio={ratio}
      direction={direction}
      onThumbChange={setThumb}
    >
      <Interactive
        ref={mergedRef}
        data-slider="root"
        data-direction={direction}
        {...props}
        className={cn(
          [
            'relative',
            'flex',
            'items-center',
            'data-[direction=horizontal]:w-full',
            'data-[direction=horizontal]:min-h-4',
            'data-[direction=vertical]:flex-col',
            'data-[direction=vertical]:h-full',
            'data-[direction=vertical]:min-w-4',
          ],
          className
        )}
        onContextMenu={composeHandlers(onContextMenu, (event) => {
          event.preventDefault();
        })}
        onHomeKey={() => updateValue(min)}
        onEndKey={() => updateValue(max)}
        onPageKey={(event) => {
          if (event.key === 'PageDown') {
            updateValue(value - step * 10);
          } else if (event.key === 'PageUp') {
            updateValue(value + step * 10);
          }
        }}
        onArrowKey={(event) => {
          const multiplier = event.shiftKey ? 10 : 1;

          if (['ArrowLeft', 'ArrowDown'].includes(event.key)) {
            updateValue(value - step * multiplier);
          } else if (['ArrowRight', 'ArrowUp'].includes(event.key)) {
            updateValue(value + step * multiplier);
          }
        }}
        onSlideStart={handleSlide}
        onSlideMove={handleSlide}
      />
    </SliderContext>
  );
};

Slider.displayName = DISPLAY_NAME;
Slider.useContext = useSliderContext;
Slider.Track = SliderTrack;
Slider.Steps = SliderSteps;
Slider.Range = SliderRange;
Slider.Thumb = SliderThumb;
