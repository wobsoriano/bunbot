import {
  Bunbot
} from './src'

const bb = new Bunbot()

setTimeout(() => {
  const result = bb.type("hello world")

console.log(result)
}, 2000);
