import {
  Bunbot
} from './src'

const bb = new Bunbot()

setTimeout(() => {
  const result = bb.click('left', true)

console.log(result)
}, 2000);
