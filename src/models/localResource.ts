/**
 * Resource that is stored locally, and therefore has a path relative to the project root.
 */
export class LocalResource {
  /**
   * Path to the local resource, relative to the project root.
   */
  readonly path: string

  constructor(path: string) {
    this.path = path
  }

  /**
   * Creates a local path to a leaflet marker or marker shadow.
   *
   * @param markerPath<string> Path to a marker (shadow), relative to {@link MarkerResource.PATH_PREFIX}.
   */
  public static marker = (markerPath: string) => new MarkerResource(markerPath)
}

export class MarkerResource extends LocalResource {
  static readonly PATH_PREFIX = '/marker/'

  constructor(path: string) {
    super(MarkerResource.PATH_PREFIX + path)
  }
}
