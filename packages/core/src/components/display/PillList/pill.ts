export class Pill {
  constructor(
    readonly id: string | number,
    readonly label: string,
    readonly iconCls?: string,
    readonly busy?: boolean,
    readonly tooltipText?: string,
    readonly tooltipShowOnHover: boolean = true
  ) {
  }
}
