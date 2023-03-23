export const arrayMixin = {
  methods: {
    moveInArray(array: unknown[], oldIndex: number, newIndex: number) {
      const target = array[oldIndex]
      this.removeFromArray(array, oldIndex)
      this.addToArray(array, newIndex, target)
    },
    removeFromArray(array: unknown[], index: number) {
      array.splice(index, 1)
    },
    addToArray(array: unknown[], atIndex: number, element: unknown) {
      array.splice(atIndex, 0, element)
    }
  }
}
