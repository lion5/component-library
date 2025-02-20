export class Address {
  street: string
  postalCode: string
  city: string

  constructor(street = '', postalCode = '', city = '') {
    this.street = street
    this.postalCode = postalCode
    this.city = city
  }

  toString() {
    if (this.street && this.postalCode && this.city) {
      return `${this.street}, ${this.postalCode} ${this.city}`
    } else {
      return ''
    }
  }

  isEmpty() {
    return !this.street && !this.postalCode && !this.city
  }

  isComplete() {
    return this.street && this.postalCode && this.city
  }

  equals(other: Address) {
    return (
      this.street === other.street &&
      this.postalCode === other.postalCode &&
      this.city === other.city
    )
  }

  toApi() {
    return {
      street: this.street,
      postalCode: this.postalCode,
      city: this.city
    }
  }

  clone() {
    return new Address(this.street, this.postalCode, this.city)
  }
}
