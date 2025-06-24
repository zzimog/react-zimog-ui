import { createRef, type MouseEvent } from 'react';
import { styled } from '../utils';

export type HaloProps = {
  className?: string;
};

const HaloRoot = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',

  [`&::before`]: {
    content: '""',
    position: 'absolute',
    top: 'var(--y)',
    left: 'var(--x)',
    display: 'block',
    width: 0,
    height: 0,
    transform: 'translate(-50%, -50%)',
    opacity: 0,
    background: 'radial-gradient(circle closest-side, var(--halo-color, #fff), transparent)',
    transitionProperty: 'width, height, opacity',
    transitionDuration: '.15s',
    transitionTimingFunction: 'linear',
  },

  [`&:hover::before`]: {
    width: 'var(--halo-size, 100px)',
    height: 'var(--halo-size, 100px)',
    opacity: 'var(--halo-opacity, 0.5)',
  },
});

const Halo = (props: HaloProps) => {
  const { className } = props;
  const ref = createRef<HTMLDivElement>();

  function handleMouseMove(evt: MouseEvent) {
    if (ref.current) {
      const { top, left } = ref.current.getBoundingClientRect();
      const x = Math.round(evt.pageX - left);
      const y = Math.round(evt.pageY - top);

      ref.current.style.setProperty('--x', `${x}px`);
      ref.current.style.setProperty('--y', `${y}px`);
    }
  }

  return (
    <HaloRoot ref={ref} className={className} onMouseMove={handleMouseMove} />
  );
};

export default Halo;
