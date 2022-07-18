import {
  Bunbot
} from './src'

const bb = new Bunbot()

setTimeout(() => {
  const result = bb.moveMouseSmooth(100, 100)

console.log(result)
}, 2000);
