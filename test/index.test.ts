import { describe, test, expect } from 'bun:test'
import {
  getVersion,
  getMouseColor,
  getScreenSize,
  getScaleSize,
  move,
  moveSmooth,
  setMouseSleep,
  scrollMouse
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
  setMouseSleep(100)

  test('move', () => {
    // move(500, 500)
  })

  test('moveSmooth', () => {
    move(200, 400)
  })

  test('scrollMouse', () => {
    scrollMouse(100, "up")
  })
})
