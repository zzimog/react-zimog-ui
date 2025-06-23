export function guid(length: 8 | 16 = 8): string {
  if (length === 16) {
    return guid() + guid();
  }

  return Math.random().toString(36).substring(2, 10);
}

export default guid;
