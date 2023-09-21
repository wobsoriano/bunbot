# bunbot

Desktop automation for the Bun runtime. Currently works on Mac.

[![npm (tag)](https://img.shields.io/npm/v/bunbot?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/bunbot) ![NPM](https://img.shields.io/npm/l/bunbot?style=flat&colorA=000000&colorB=000000)

## Requirements

Bunbot uses [RobotGo](https://github.com/go-vgo/robotgo) via `bun:ffi`. Please see RobotGo's requirements [here](https://github.com/go-vgo/robotgo#requirements).

## Usage

```bash
bun add bunbot
```

### Mouse

```ts
import { CreateBot } from 'bunbot'

const bb = CreateBot()

// Click
bb.click()
// Get mouse position coordinates
const mousePosition = bb.getMousePosition()
// Move mouse
bb.moveMouse(200, 400)
// Move mouse smoothly
bb.moveMouseSmooth(200, 400)
// Scroll mouse
bb.scrollMouse(100, 200)
```

### Keyboard

```ts
import { CreateBot } from 'bunbot'

const bb = CreateBot()

// Type a string
bb.type('Hello world!')
// Tap a key
bb.tap('i', 'alt', 'command')
```

### Screen

```ts
import { CreateBot } from 'bunbot'

const bb = CreateBot()

// Get screen size
const screenSize = bb.getScreenSize()
// Get scale size
const scaleSize = bb.getScaleSize()
```

### Other

```ts
import { CreateBot } from 'bunbot'

const bb = CreateBot()

// Get the image text using Tesseract OCR.
const text = bb.getText()
```

## License

MIT
