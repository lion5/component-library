export class SearchResult {
  key: string | number
  label: string
  value: object

  constructor(key: string | number, label: string, value: object) {
    this.key = key
    this.label = label
    this.value = value
  }
}
