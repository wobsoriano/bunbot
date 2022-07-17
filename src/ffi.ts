import { dlopen, FFIType, suffix } from 'bun:ffi'
import { toString } from './utils'

export type Coords = {
  x: number
  y: number
}

const { symbols } = dlopen(`${import.meta.dir}/../release/bunbot.${suffix}`, {
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
  Move: {
    args: [FFIType.int, FFIType.int],
    returns: FFIType.void
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

export function move(x: number, y: number) {
  symbols.Move(x, y)
}
