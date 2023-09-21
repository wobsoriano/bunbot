import { Bunbot } from './src'

const bb = new Bunbot()

setTimeout(() => {
	console.log(123)

	// const mousePos = bb.getMousePosition()
	// console.log(mousePos)
	// bb.type(`Mouse coords: ${JSON.stringify(mousePos)}`)
	// bb.tap('enter')
	// const screenSize = bb.getScreenSize()
	// console.log(screenSize)
	// bb.type(`Screen size: ${JSON.stringify(screenSize)}`)
	// bb.type('Hello world')
	const x = bb.getText('./sample.webp')
	console.log(x)
}, 2000)
