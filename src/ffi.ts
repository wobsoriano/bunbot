import { dlopen, FFIType, ptr } from 'bun:ffi'
import { toString, encode } from './utils'

export type Coords = {
  x: number
  y: number
}

const fileName = `${process.platform}-${process.arch}`
const { symbols } = dlopen(`${import.meta.dir}/../release/${fileName}`, {
  GetVersion: {
    args: [],
    returns: FFIType.ptr
  },
  // Screen
  GetMouseColor: {
    args: [],
    returns: FFIType.ptr
  },
  GetScreenSize: {
    args: [],
    returns: FFIType.ptr
  },
  GetScaleSize: {
    args: [],
    returns: FFIType.ptr
  },
  // Mouse
  SetMouseSleep: {
    args: [FFIType.int],
    returns: FFIType.void
  },
  ScrollMouse: {
    args: [FFIType.int, FFIType.ptr],
    returns: FFIType.void
  },
  Move: {
    args: [FFIType.int, FFIType.int],
    returns: FFIType.void
  },
  MoveSmooth: {
    args: [FFIType.int, FFIType.int, FFIType.f64, FFIType.f64],
    returns: FFIType.bool
  },
  FreeString: {
    args: [FFIType.ptr],
    returns: FFIType.void
  }
})

export function freeString(ptr: number) {
  symbols.FreeString(ptr)
}

export function getVersion(): string {
  const ptr = symbols.GetVersion()
  return toString(ptr)
}

export function getMouseColor(): string {
  const ptr = symbols.GetMouseColor()
  return toString(ptr)
}

export function getScreenSize(): Coords {
  const ptr = symbols.GetScreenSize()
  return JSON.parse(toString(ptr))
}

export function getScaleSize(): Coords {
  const ptr = symbols.GetScaleSize()
  return JSON.parse(toString(ptr))
}

// Mouse
export function setMouseSleep(millisecond: number) {
  symbols.SetMouseSleep(millisecond)
}

export function scrollMouse(x: number, direction?: 'up' | 'down' | 'left' | 'right') {
  symbols.ScrollMouse(x, ptr(encode(direction)))
}

export function move(x: number, y: number) {
  symbols.Move(x, y)
}

export function moveSmooth(x: number, y: number) {
  symbols.MoveSmooth(x, y)
}
