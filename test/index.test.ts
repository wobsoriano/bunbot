import { test, expect } from 'bun:test'
import { getVersion, getMouseColor } from '../src'

test('getVersion', () => {
  expect(getVersion()).toBe("v1.00.0.1189, MT. Baker!")
})

test('getMouseColor', () => {
  expect(getMouseColor()).toBe("has color")
})
