import { ptr as toPtr } from 'bun:ffi'
import { symbols } from './ffi'
import { Coords } from './types'
import { toString, encode } from './utils'

export class Bunbot {
  constructor() {}

  freeString(ptr: number) {
    symbols.FreeString(ptr)
  }
  
  getRobotGoVersion(): string {
    const ptr = symbols.GetVersion()
    return toString(ptr)
  }

  // Screen

  getPixelColor(x: number, y: number): string {
    const ptr = symbols.GetPixelColor(x, y)
    return toString(ptr)
  }

  getScreenSize(): Coords {
    const ptr = symbols.GetScreenSize()
    return JSON.parse(toString(ptr))
  }

  getScaleSize(): Coords {
    const ptr = symbols.GetScaleSize()
    return JSON.parse(toString(ptr))
  }

  // Mouse

  /**
   * @param {number} millisecond Default mouse sleep time
   */
  setMouseSleep(millisecond: number) {
    symbols.SetMouseSleep(millisecond)
  }

  scrollMouse(x: number, y: number) {
    symbols.ScrollMouse(x, y)
  }

  moveMouse(x: number, y: number) {
    symbols.Move(x, y)
  }

  dragMouse(x: number, y: number) {
    symbols.Drag(x, y)
  }

  moveMouseSmooth(x: number, y: number, low = 0, high = 0) {
    symbols.MoveSmooth(x, y, high, low)
  }

  getMousePosition(): Coords {
    const ptr = symbols.GetMousePos()
    return JSON.parse(toString(ptr)) 
  }

  /**
   * @param {string} button Button to click to 
   * @param {boolean} doubleClick Should double click 
   */
  click(button: 'right' | 'left' | 'wheelLeft' = 'left', doubleClick = false) {
    symbols.Click(toPtr(encode(button)), doubleClick)
  }

  // Keyboard

  /**
   * @param {string} text Text to type
   */
  type(text: string) {
    symbols.TypeStr(toPtr(encode(text)))
  }

  /**
   * @param {string} key Key
   * @param {string} modifiers Modifiers
   */
   tap(key: string, ...modifiers: string[]) {
    const keyPtr = toPtr(encode(key))
    const modifiersPtr = toPtr(encode(modifiers))
    symbols.KeyTap(keyPtr, modifiersPtr)
  }

  getText(imagePath: string) {
    const ptr = symbols.GetText(toPtr(encode(imagePath)))
    const { result, error } = JSON.parse(toString(ptr)) as {
      result: string,
      error: string
    }
    
    if (error !== '') {
      throw new Error(error)
    }

    return result
  }
}

export default Bunbot
