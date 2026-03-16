type StackItem = {
  current: boolean;
};

const stack: StackItem[] = [];

function removeItem(item: StackItem) {
  const index = stack.indexOf(item);
  if (index !== -1) {
    stack.splice(index, 1);
  }
}

export const FocusStack = {
  add(item: StackItem) {
    if (stack[0] && item !== stack[0]) {
      stack[0].current = false;
    }

    removeItem(item);
    stack.unshift(item);
  },
  remove(item: StackItem) {
    removeItem(item);

    if (stack[0]) {
      stack[0].current = true;
    }
  },
};
