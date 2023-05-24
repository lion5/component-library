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

export class TacticalSign extends LocalResource {
  static readonly PATH_PREFIX = '/svg/tactical-signs/'

  /**
   * Human-readable name of the tactical sign, without any underscores or
   * special characters.
   */
  public name: string | undefined

  /**
   * The path relative to the directory described by the {@link PATH_PREFIX}.
   */
  public relativePath: string

  /**
   * Creates a local path to a tactical sign.
   * See https://github.com/jonas-koeritz/Taktische-Zeichen/tree/v1.9.9.4/symbols
   * for available options.
   *
   * @param tacticalSignPath<string> Path to a tactical sign relative to {@link TacticalSign.PATH_PREFIX}.
   */
  constructor(tacticalSignPath: string) {
    if (tacticalSignPath.includes(TacticalSign.PATH_PREFIX)) {
      throw new Error('tacticalSignPath already includes prefix')
    }
    if (tacticalSignPath.startsWith('/')) {
      throw new Error('tacticalSignPath must not contain a leading "/"')
    }

    super(TacticalSign.PATH_PREFIX + tacticalSignPath)
    this.relativePath = tacticalSignPath
    this.name = tacticalSignPath
      .split('/')
      .pop()
      ?.replace(/_/g, ' ')
      .replace('.svg', '')
  }

  public static withPrefix(pathWithPrefix: string) {
    if (!pathWithPrefix.includes(TacticalSign.PATH_PREFIX)) {
      throw new Error('pathWithPrefix must include prefix')
    }
    return new TacticalSign(
      pathWithPrefix.replace(TacticalSign.PATH_PREFIX, '')
    )
  }
}

export class MarkerResource extends LocalResource {
  static readonly PATH_PREFIX = '/marker/'

  constructor(tacticalSignPath: string) {
    super(MarkerResource.PATH_PREFIX + tacticalSignPath)
  }
}
