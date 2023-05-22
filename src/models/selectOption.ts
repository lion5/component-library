export class SelectOption {
  readonly key: string | number | null
  readonly label: any

  constructor(key: string | number | null, label: any) {
    this.key = key
    this.label = label
  }
}
