# bunbot

Desktop automation for the Bun runtime. Currently works on Mac.

[![npm (tag)](https://img.shields.io/npm/v/bunbot?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/bunbot) ![NPM](https://img.shields.io/npm/l/bunbot?style=flat&colorA=000000&colorB=000000)

## Requirements

Bunbot uses [bot](https://github.com/go-vgo/bot) via `bun:ffi`. Please see bot's requirements [here](https://github.com/go-vgo/bot#requirements).

## Usage

```bash
bun add bunbot
```

### Mouse

```ts
import { CreateBot } from 'bunbot'

const bot = CreateBot()

bot.setMouseSleep(100)

bot.scrollDir(10, 'up')
bot.scrollDir(20, 'right')

bot.scroll(0, -10)
bot.scroll(100, 0)

bot.milliSleep(100)
bot.scrollSmooth(-10, 6)

bot.move(10, 20)
bot.moveRelative(0, -10)
bot.dragSmooth(10, 10)

bot.click('wheelRight')
bot.click('left', true)
bot.moveSmooth(100, 200, 1.0, 10.0)

bot.toggle('left')
bot.toggle('left', 'up')
```

### Keyboard

```ts
import { CreateBot } from 'bunbot'

const bb = CreateBot()

bot.typeStr('Hello World')
bot.typeStr('だんしゃり')
// bot.TypeStr('テストする')

bot.typeStr('Hi, Seattle space needle, Golden gate bridge, One world trade center.')
bot.typeStr('Hi galaxy, hi stars, hi MT.Rainier, hi sea. こんにちは世界.')
bot.sleep(1)

// ustr := uint32(bot.CharCodeAt('Test', 0))
// bot.UnicodeType(ustr)

bot.setKeySleep(100)
bot.keyTap('enter')
// bot.TypeStr('en')
bot.keyTap('i', 'alt', 'cmd')

bot.keyTap('i', 'alt', 'cmd')

bot.milliSleep(100)
bot.keyToggle('a')
bot.keyToggle('a', 'up')

bot.writeAll('Test')

const text = bot.readAll()
```

### Screen

```ts
import { CreateBot } from 'bunbot'

const bb = CreateBot()

const { x, y } = bb.location()
console.log('pos: ', x, y)

const scaleSize = bb.getPixelColor(100, 200)
console.log('color: ', color)

const { x: sx, y: sy } = bb.getScreenSize()
console.log('get screen size: ', sx, sy)
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
