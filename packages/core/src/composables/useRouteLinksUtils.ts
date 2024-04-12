import { Address } from '@core/models/address'

export function useRouteGoogleMapsLink() {
  const getGoogleMapsLink = (address: Address) => {
    // Google maps direction documentation https://developers.google.com/maps/documentation/urls/guide#directions-action
    const destination = `${address.street}, ${address.postalCode} ${address.city}`
    const encodedDestination = encodeURI(destination)
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`
  }

  return { getGoogleMapsLink }
}
