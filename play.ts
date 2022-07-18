import { Bunbot } from './src'

const bb = new Bunbot()

const mousePos = bb.getMousePosition()
bb.type(`Mouse coords: ${JSON.stringify(mousePos)}`)
bb.tap('enter')
const screenSize = bb.getScreenSize()
bb.type(`Screen size: ${JSON.stringify(screenSize)}`)

setTimeout(() => {
	console.log(123)
}, 4000)
