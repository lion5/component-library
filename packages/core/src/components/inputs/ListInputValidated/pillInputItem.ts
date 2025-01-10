export class PillInputItem {
  key: string | number
  label: string
  busy: boolean
  iconCls: string | undefined

  constructor(key: string | number, label: string, busy: boolean, iconCls?: string) {
    this.key = key
    this.label = label
    this.busy = busy
    this.iconCls = iconCls
  }
}
