import { dlopen, FFIType, suffix, CString } from 'bun:ffi'

// const utf8e = new TextEncoder()

// function encode<T>(data: T): Uint8Array {
//   return utf8e.encode(data + "\0")
// }

export type Signal = {
  signal: 'CtrlC' | 'CtrlD' | null
  value: string | null
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
  const str = new CString(ptr)
  freeString(str.ptr)
  return str.toString()
}

export function getMouseColor(): string {
  const ptr = symbols.GetMouseColor()
  const str = new CString(ptr)
  freeString(str.ptr)
  return str.toString()
}
