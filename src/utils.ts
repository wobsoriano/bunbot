import { CString } from 'bun:ffi'
import { freeString } from './ffi'

const utf8e = new TextEncoder()

export function encode<T>(data: T): Uint8Array {
  return utf8e.encode(data + "\0")
}

export function toString(ptr: any): string {
  const str = new CString(ptr)
  freeString(str.ptr)
  return str.toString()
}
