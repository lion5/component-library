export class SelectOption<LabelType> {
  readonly key: string | number | null
  readonly label: LabelType

  constructor(key: string | number | null, label: LabelType) {
    this.key = key
    this.label = label
  }
}
