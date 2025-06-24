function generateClasses(
  component: string,
  slots: Array<string>,
  prefix: string = 'z'
) {
  return slots.reduce<Record<string, string>>((classes, slot) => {
    classes[slot] = `${prefix}${component}-${slot}`;
    return classes;
  }, {});
}

export default generateClasses;
