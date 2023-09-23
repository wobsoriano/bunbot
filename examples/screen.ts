import { CreateBot } from '../src'

const bot = CreateBot()

setTimeout(() => {
  const num = bot.displaysNum()

  for (let i = 0; i < num; i++) {
    bot.setDisplayID(i)

    const img1 = bot.captureImg()
    const path1 = `save_${i}`
    bot.save(img1, `${path1}.png`)
    bot.saveJpeg(img1, `${path1}.jpeg`, 50)

    const img2 = bot.captureImg(10, 10, 20, 20)
    bot.save(img2, `test_${i}.png`)
  }
}, 1000)