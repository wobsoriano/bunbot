import { dlopen, FFIType, suffix } from 'bun:ffi'
import { toString } from './utils'

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
