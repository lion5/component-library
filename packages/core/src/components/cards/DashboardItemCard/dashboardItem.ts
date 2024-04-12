export class DashboardItem {
  readonly icon: string // icon-class
  readonly name: string
  readonly routerLinkName: string

  constructor(icon: string, name: string, routerLinkName: string) {
    this.icon = icon
    this.name = name
    this.routerLinkName = routerLinkName
  }
}
