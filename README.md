# bunbot

WIP!

Native cross-platform GUI automation for the Bun runtime.

## Install

```bash
bun add bunbot
```

## Usage

```ts
import { scrollMouse, getScreenSize } from 'bunbot'

scrollMouse(10, 'up')
scrollMouse(20, 'right')

console.log(getScreenSize())
// { x: 1920, y: 1080 }
```

## License

MIT
