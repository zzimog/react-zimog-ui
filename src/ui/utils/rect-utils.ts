export function rectEquals(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.width === rect2.width &&
    rect1.height === rect2.height &&
    rect1.top === rect2.top &&
    rect1.right === rect2.right &&
    rect1.bottom === rect2.bottom &&
    rect1.left === rect2.left
  );
}

export function getRelativeRect(rootRect: DOMRect, nodeRect: DOMRect): DOMRect {
  const top = nodeRect.top - rootRect.top;
  const left = nodeRect.left - rootRect.left;

  const relativeRect = {
    x: left,
    y: top,
    width: nodeRect.width,
    height: nodeRect.height,
    top,
    left,
    right: left + nodeRect.width,
    bottom: top + nodeRect.height,
  };

  return Object.freeze({
    ...relativeRect,
    toJSON: () => relativeRect,
  });
}
