type AnimationCallback = FrameRequestCallback;
type AnimationStopCallback = () => void;

const callbacks = new Set<AnimationCallback>();

let rafId: number;

function loop(time: DOMHighResTimeStamp) {
  for (const callback of [...callbacks]) {
    callback(time);
  }

  rafId = requestAnimationFrame(loop);
}

export function animationLoop(
  callback: AnimationCallback
): AnimationStopCallback {
  callbacks.add(callback);

  if (callbacks.size === 1) {
    rafId = requestAnimationFrame(loop);
  }

  return () => {
    callbacks.delete(callback);

    if (callbacks.size === 0) {
      cancelAnimationFrame(rafId);
    }
  };
}
