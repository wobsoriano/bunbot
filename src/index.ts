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

  getMousePositionColor(): string {
    const ptr = symbols.GetMouseColor()
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

  moveMouseSmooth(x: number, y: number) {
    symbols.MoveSmooth(x, y)
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
    symbols.Click(toPtr(encode(button)), Number(doubleClick))
  }
}

export default Bunbot
