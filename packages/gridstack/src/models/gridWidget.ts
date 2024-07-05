import type { GridStackWidget } from 'gridstack'

export interface ApiGridWidget {
  x: number
  y: number
  width: number
  height: number
}

export class GridWidget implements GridStackWidget {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  toGridStackWidget(): GridStackWidget {
    return {
      x: this.x,
      y: this.y,
      w: this.width,
      h: this.height
    }
  }
}
