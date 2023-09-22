import { Pointer, ptr as toPtr } from 'bun:ffi'
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

  displaysNum(): number {
    return symbols.DisplaysNum()
  }

  captureImg(x = 0, y = 0, w = 0, h = 0): Pointer {
    const ptr = symbols.CaptureImg(x, y, w, h)
    return ptr!
  }

  setDisplayID(id: number) {
    symbols.SetDisplayID(id)
  }

  save(img: Pointer, path: string, quality = 70) {
    symbols.Save(img, toPtr(encode(path)), quality)
  }

  saveJpeg(img: Pointer, path: string, quality = 70) {
    symbols.SaveJpeg(img, toPtr(encode(path)), quality)
  }

  // Mouse

  scrollDir(x: number, direction = 'down') {
    symbols.ScrollDir(x, toPtr(encode(direction)))
  }

  scroll(x: number, y: number, msDelay = 10) {
    symbols.Scroll(x, y, msDelay)
  }

  milliSleep(tm: number) {
    symbols.MilliSleep(tm)
  }

  scrollSmooth(toy: number, num = 5, sleep = 100, tox = 0) {
    symbols.ScrollSmooth(toy, num, sleep, tox)
  }

  move(x: number, y: number) {
    symbols.Move(x, y)
  }

  moveRelative(x: number, y: number) {
    symbols.MoveRelative(x, y)
  }

  dragSmooth(x: number, y: number) {
    symbols.DragSmooth(x, y)
  }

  /**
   * @param {number} millisecond Default mouse sleep time
   */
  setMouseSleep(millisecond: number) {
    symbols.SetMouseSleep(millisecond)
  }

  scrollMouse(x: number, y: number) {
    symbols.ScrollMouse(x, y)
  }

  moveSmooth(x: number, y: number, low = 1.0, high = 3.0) {
    symbols.MoveSmooth(x, y, high, low)
  }

  toggle(key: string, direction = 'down') {
    symbols.Toggle(toPtr(encode(key)), toPtr(encode(direction)))
  }

  Location(): Coords {
    const ptr = symbols.Location()
    return JSON.parse(toString(ptr)) 
  }

  /**
   * @param {string} button Button to click to 
   * @param {boolean} doubleClick Should double click 
   */
  click(button: 'right' | 'left' | 'wheelLeft' | 'wheelRight' = 'left', doubleClick = false) {
    symbols.Click(toPtr(encode(button)), doubleClick)
  }

  // Keyboard

  /**
   * @param {string} text Text to type
   */
  typeStr(text: string) {
    symbols.TypeStr(toPtr(encode(text)))
  }

  /**
   * @param {string} key Key
   * @param {string} modifiers Modifiers
   */
   keyTap(key: string, ...modifiers: string[]) {
    const keyPtr = toPtr(encode(key))
    const modifiersPtr = toPtr(encode(modifiers))
    symbols.KeyTap(keyPtr, modifiersPtr)
  }

  /**
   * @param {string} key Key
   * @param {string} modifiers Modifiers
   */
   keyToggle(key: string, ...modifiers: string[]) {
    const keyPtr = toPtr(encode(key))
    const modifiersPtr = toPtr(encode(modifiers))
    symbols.KeyToggle(keyPtr, modifiersPtr)
  }

  /**
   * Write string to clipboard
   */
   writeAll(text: string) {
    const textPtr = toPtr(encode(text))
    symbols.WriteAll(textPtr)
  }

  /**
   * Read string from clipboard.
   */
  readAll() {
    const ptr = symbols.ReadAll()
    const { result, error } = JSON.parse(toString(ptr)) as {
      result: string,
      error: string
    }
    
    if (error !== '') {
      throw new Error(error)
    }
    
    return result
  }

  /**
   * Get the image text using Tesseract OCR.
   * @param {string} imagePath 
   * @returns {string}
   */
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

  sleep(tm: number) {
    symbols.Sleep(tm)
  }

  setKeySleep(tm: number) {
    symbols.Sleep(tm)
  }
}

export function CreateBot() {
  return new Bunbot()
}
