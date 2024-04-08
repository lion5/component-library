import { Circle, Layer, Map as LeafletMap, Polygon, Rectangle } from 'leaflet'

/**
 * Util functions control leaflet layers(shapes)
 */
export function useShape() {
  /**
   * adds the given layer to the given map
   *
   * @param map the map on which the marker should be added.
   * @param layer the layer to add
   */
  const addShape = (map: LeafletMap, layer: Layer) => {
    layer.addTo(map)
  }

  /**
   * removes the given layer to from its map
   *
   * @param layer the layer to add
   */
  const removeShape = (layer: Layer) => {
    layer.remove()
  }

  /**
   * replaces a layer with its new layer
   *
   * @param map the map on which the marker should be added.
   * @param oldLayer the layer to remove
   * @param newLayer the layer to add
   */
  const updateShape = (map: LeafletMap, oldLayer: Layer, newLayer: Layer) => {
    removeShape(oldLayer)
    addShape(map, newLayer)
  }

  /**
   * Returns leaflets definition of center based by shape type
   * @param layer the layer of that the center should be returned
   */
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
    getShapeCenter
  }
}
