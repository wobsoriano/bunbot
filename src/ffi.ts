import { dlopen, FFIType } from 'bun:ffi'

const location = new URL(`../release/${process.platform}-${process.arch}`, import.meta.url).pathname
export const { symbols } = dlopen(location, {
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
    args: [FFIType.int, FFIType.int],
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
  GetMousePos: {
    args: [],
    returns: FFIType.ptr
  },
  Click: {
    args: [FFIType.ptr, FFIType.bool],
    returns: FFIType.void
  },
  FreeString: {
    args: [FFIType.ptr],
    returns: FFIType.void
  }
})
