import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useInterval } from './useInterval'

vi.mock('vue', async () => ({
  ...await vi.importActual('vue'),
  onUnmounted: vi.fn()
}))

describe('useInterval..ts', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('createIntervalSeconds - runs handler after defined seconds', () => {
    const mock = vi.fn()

    const { createIntervalSeconds } = useInterval()
    createIntervalSeconds(mock, 60)
    vi.advanceTimersByTime(61000)

    expect(mock).toHaveBeenCalled()
  })
  it('removeInterval - handler is not called if interval is removed', () => {
    const mock = vi.fn()

    const { createIntervalSeconds, removeInterval } = useInterval()
    createIntervalSeconds(mock, 60)
    removeInterval()
    vi.advanceTimersByTime(61000)

    expect(mock).not.toHaveBeenCalled()
  })
})
