import { test, expect } from 'bun:test'
import { getVersion } from '../src'

test('getVersion', () => {
  expect(getVersion()).toBe("v1.00.0.1189, MT. Baker!")
})
