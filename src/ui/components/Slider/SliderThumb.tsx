import { BubbleInput, Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { Slider } from './Slider';

const DISPLAY_NAME = 'SliderThumb';

type SliderThumbProps = NativeProps<'span'>;

export const SliderThumb = (inProps: SliderThumbProps) => {
  const { ref: refProp, className, style, ...props } = inProps;

  const context = Slider.useContext(DISPLAY_NAME);
  const { min, max, value, ratio, direction, onThumbChange } = context;

  const mergedRef = useMergedRefs(refProp, onThumbChange);
  const ariaLabel = props['aria-label'] || `Value: ${value}`;
  const isHorizontal = direction === 'horizontal';

  return (
    <Native.span
      ref={mergedRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      data-slider="thumb"
      data-direction={direction}
      tabIndex={0}
      {...props}
      className={cn(
        [
          'absolute',
          'size-4',
          'border',
          'border-muted',
          'bg-input',
          'rounded-full',
          'focusable',
          'transition-colors',
          'hover:border-primary',
          'focus:border-primary',
          'focus:outline-outline',
          'after:absolute',
          'after:-inset-2',
          '[translate:var(--translate)]',
          'data-[direction=horizontal]:top-0',
          'data-[direction=horizontal]:left-(--ratio)',
          'data-[direction=vertical]:left-0',
          'data-[direction=vertical]:bottom-(--ratio)',
        ],
        className
      )}
      style={{
        ['--translate' as string]: isHorizontal ? '-50% 0' : '0 50%',
        ['--ratio' as string]: `${ratio * 100}%`,
        ...style,
      }}
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        target.focus();
      }}
    >
      <BubbleInput value={value} style={{ display: 'none' }} />
    </Native.span>
  );
};

SliderThumb.displayName = DISPLAY_NAME;
