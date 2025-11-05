import { type PolyProps, Poly, cn } from '@ui';
import { Children, cloneElement, type ReactElement } from 'react';

type MarqueeProps = Omit<PolyProps<'div'>, 'children'> & {
  direction?: 'left' | 'right';
  children?: ReactElement<PolyProps<'div'>>;
};

const Marquee = (inProps: MarqueeProps) => {
  const { direction = 'left', className, children, ...props } = inProps;

  const left = direction === 'left';
  const right = direction === 'right';
  const child = Children.only(children);

  return (
    <>
      <style>{`
        @keyframes slide-left {
          to {
            transform: translateX(-100%);
          }
        }
        @keyframes slide-right {
          from {
            transform: translateX(-100%);
          }
        }
      `}</style>
      <Poly.div
        className={cn(
          'w-200',
          'flex',
          'overflow-hidden',
          'hover:*:play-state-paused',
          left &&
            '*:animate-[slide-left_var(--animation-duration,10s)_infinite_linear]',
          right &&
            '*:animate-[slide-right_var(--animation-duration,10s)_infinite_linear]',
          className
        )}
        {...props}
      >
        {children}
        {child && cloneElement(child, { 'aria-hidden': true })}
      </Poly.div>
    </>
  );
};

const App = () => {
  const content = (
    <ul className="flex shrink-0 min-w-full gap-2 p-1">
      <li>Lorem</li>
      <li>ipsum</li>
      <li>dolor</li>
      <li>sit</li>
      <li>amet,</li>
      <li>consectetur</li>
      <li>adipisicing</li>
      <li>elit.</li>
      <li>Error</li>
      <li>atque</li>
      <li>necessitatibus</li>
      <li>eum</li>
      <li>quis</li>
      <li>a</li>
      <li>veniam.</li>
    </ul>
  );

  return (
    <div className="flex flex-col gap-2">
      <Marquee className="border-y-2">{content}</Marquee>
      <Marquee direction={'right'} className="border-y-2">
        {content}
      </Marquee>
    </div>
  );
};

export default App;
