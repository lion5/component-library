export class SelectOption<LabelType> {
  readonly key: string | number | boolean | null
  readonly label: LabelType
  readonly img?: string
  readonly icon?: string

  constructor(
    key: string | number | boolean | null,
    label: LabelType,
    img?: string,
    icon?: string
  ) {
    this.key = key
    this.label = label
    this.img = img
    this.icon = icon
  }
}
