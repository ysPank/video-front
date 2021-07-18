export const immutableSplice = (list, index) => [...list.slice(0, index), ...list.slice(index + 1)];
export const immutableUpdateByIndex = (list, index, value) => [...list.slice(0, index), value, ...list.slice(index + 1)];
export const immutableInsertByIndex = (list, oldIndex, newIndex, value) => {
  const withoutElement = immutableSplice(list, oldIndex);

  return [...withoutElement.slice(0, newIndex), value, ...withoutElement.slice(newIndex)];
}
