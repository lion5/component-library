import { Circle, Layer, Map as LeafletMap, Polygon, Rectangle } from 'leaflet'

export function useShape() {
  const addShape = (map: LeafletMap, layer: Layer) => {
    layer.addTo(map)
  }

  const removeShape = (layer: Layer) => {
    layer.remove()
  }

  const updateShape = (map: LeafletMap, oldLayer: Layer, newLayer: Layer) => {
    removeShape(oldLayer)
    addShape(map, newLayer)
  }
  const getShapeCenter = (layer: Layer) => {
    let center
    if (layer instanceof Polygon) {
      center = layer.getBounds().getCenter()
    }
    if (layer instanceof Circle) {
      center = layer.getBounds().getCenter()
    }
    if (layer instanceof Rectangle) {
      center = layer.getCenter()
    }
    return center
  }

  return {
    addShape,
    removeShape,
    updateShape,
    getShapeCenter,
  }
}
