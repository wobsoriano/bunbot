import { dlopen, FFIType, suffix } from 'bun:ffi'

const { platform, arch } = process

let filename: string

if (arch === 'x64') {
  filename = `../release/bunbot-${platform}-amd64.${suffix}`
} else {
  filename = `../release/bunbot-${platform}-${arch}.${suffix}`
}

const location = new URL(filename, import.meta.url).pathname

export const { symbols } = dlopen(location, {
  GetVersion: {
    args: [],
    returns: FFIType.ptr
  },
  // Screen
  GetPixelColor: {
    args: [FFIType.int, FFIType.int],
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
  Scroll: {
    args: [FFIType.int, FFIType.int, FFIType.int],
    returns: FFIType.void
  },
  MilliSleep: {
    args: [FFIType.int],
    returns: FFIType.void
  },
  ScrollSmooth: {
    args: [FFIType.int, FFIType.int, FFIType.int, FFIType.int],
    returns: FFIType.void
  },
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
  MoveRelative: {
    args: [FFIType.int, FFIType.int],
    returns: FFIType.void
  },
  DragSmooth: {
    args: [FFIType.int, FFIType.int],
    returns: FFIType.void
  },
  MoveSmooth: {
    args: [FFIType.int, FFIType.int, FFIType.f64, FFIType.f64],
    returns: FFIType.bool
  },
  Toggle: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },
  GetMousePos: {
    args: [],
    returns: FFIType.ptr
  },
  Click: {
    args: [FFIType.ptr, FFIType.bool],
    returns: FFIType.void
  },
  // Keyboard
  TypeStr: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },
  KeyTap: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },
  GetText: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },
  FreeString: {
    args: [FFIType.ptr],
    returns: FFIType.void
  }
})
