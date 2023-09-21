import { CreateBot } from './src'

const bot = CreateBot()

setTimeout(() => {
	console.log(123)

	// bot.setMouseSleep(100)

	// bot.scrollDir(10, 'up')
	// bot.scrollDir(20, 'right')

	// bot.scroll(0, -10)
	// bot.scroll(100, 0)

	// bot.milliSleep(100)
	// bot.scrollSmooth(-10, 6)

	// bot.move(10, 20)
	// bot.moveRelative(0, -10)
	// bot.dragSmooth(10, 10)

	// bot.click('wheelRight')
	// bot.click('left', true)
	// bot.moveSmooth(100, 200, 1.0, 10.0)

	// bot.toggle('left')
	// bot.toggle('left', 'up')
}, 2000)
