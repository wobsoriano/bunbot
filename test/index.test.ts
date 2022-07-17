import { test, expect } from 'bun:test'
import { getVersion, getMouseColor, getScreenSize } from '../src'

test('getVersion', () => {
  expect(getVersion()).toBe("v1.00.0.1189, MT. Baker!")
})

test('getMouseColor', () => {
  console.log(getMouseColor())
})

test('getScreenSize', () => {
  console.log(getScreenSize())
})
