export class CopyrightInfo {
  companyName: string
  companyUrl: string
  currentYear: number

  constructor(company: string, companyUrl: string) {
    this.companyName = company
    this.companyUrl = companyUrl
    this.currentYear = new Date().getFullYear()
  }
}
