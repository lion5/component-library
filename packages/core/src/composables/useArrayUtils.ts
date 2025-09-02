export function useArrayUtils() {
  const removeFromArray = (array: unknown[], index: number) => {
    array.splice(index, 1)
  }
  const addToArray = (array: unknown[], atIndex: number, element: unknown) => {
    array.splice(atIndex, 0, element)
  }
  const moveInArray = (array: unknown[], oldIndex: number, newIndex: number) => {
    const target = array[oldIndex]
    removeFromArray(array, oldIndex)
    addToArray(array, newIndex, target)
  }

  return {
    removeFromArray,
    addToArray,
    moveInArray
  }
}
