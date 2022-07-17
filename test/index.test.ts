import { describe, test, expect } from 'bun:test'
import {
  getVersion,
  getMouseColor,
  getScreenSize,
  getScaleSize,
  move,
  moveSmooth
} from '../src'

test('getVersion', () => {
  expect(getVersion()).toBe("v1.00.0.1189, MT. Baker!")
})

describe('Screen functions', () => {
  test('getMouseColor', () => {
    console.log(getMouseColor())
  })
  
  test('getScreenSize', () => {
    console.log(getScreenSize())
  })
  
  test('getScaleSize', () => {
    console.log(getScaleSize())
  })
})

describe('Mouse functions', () => {
  test('move', () => {
    // move(500, 500)
  })

  test('moveSmooth', () => {
    // moveSmooth(100, 100)
  })
})
