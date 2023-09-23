import { CreateBot } from '../src'

const bot = CreateBot()

setTimeout(() => {
	bot.typeStr("Hello World")
  bot.typeStr("だんしゃり")
  // bot.TypeStr("テストする")

  bot.typeStr("Hi, Seattle space needle, Golden gate bridge, One world trade center.")
  bot.typeStr("Hi galaxy, hi stars, hi MT.Rainier, hi sea. こんにちは世界.")
  bot.sleep(1)

  // ustr := uint32(bot.CharCodeAt("Test", 0))
  // bot.UnicodeType(ustr)

  bot.setKeySleep(100)
  bot.keyTap("enter")
  // bot.TypeStr("en")
  bot.keyTap("i", "alt", "cmd")

  bot.keyTap("i", 'alt', 'cmd')

  bot.milliSleep(100)
  bot.keyToggle("a")
  bot.keyToggle("a", "up")

  bot.writeAll("Test")

  const x = bot.readAll()

  console.log(x)
}, 1000)
