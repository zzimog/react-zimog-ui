export function getRealRect(
  rect: DOMRect,
  styles: CSSStyleDeclaration
): DOMRect {
  const padTop = parseFloat(styles.paddingTop);
  const padRight = parseFloat(styles.paddingRight);
  const padBottom = parseFloat(styles.paddingBottom);
  const padLeft = parseFloat(styles.paddingLeft);

  const borderTop = parseFloat(styles.borderTopWidth);
  const borderRight = parseFloat(styles.borderRightWidth);
  const borderBottom = parseFloat(styles.borderBottomWidth);
  const borderLeft = parseFloat(styles.borderLeftWidth);

  return new DOMRect(
    rect.x + padLeft + borderLeft,
    rect.y + padTop + borderTop,
    rect.width - (padLeft + padRight + borderLeft + borderRight),
    rect.height - (padTop + padBottom + borderTop + borderBottom)
  );
}

export function rectEquals(rect1: DOMRect, rect2: DOMRect): boolean {
  return (
    rect1.x === rect2.x &&
    rect1.y === rect2.y &&
    rect1.width === rect2.width &&
    rect1.height === rect2.height
  );
}

export function getRelativeRect(rootRect: DOMRect, nodeRect: DOMRect): DOMRect {
  const x = nodeRect.x - rootRect.x;
  const y = nodeRect.y - rootRect.y;

  return new DOMRect(x, y, nodeRect.width, nodeRect.height);
}
