# bunbot

Native cross-platform GUI automation for the Bun runtime. WIP!

## Requirements

Bunbot uses [RobotGo](https://github.com/go-vgo/robotgo) via `bun:ffi`. Please see RobotGo's requirements [here](https://github.com/go-vgo/robotgo#requirements).

## Usage

```bash
bun add bunbot
```

```ts
import Bunbot from 'bunbot'

const bb = new Bunbot()

// Mouse


// Screen
// Get screen size
const screenSize = bb.getScreenSize()
```

## License

MIT
