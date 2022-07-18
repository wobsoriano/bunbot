import {
  Bunbot
} from './src'

const bb = new Bunbot()

bb.setMouseSleep(2)

const twoPI = Math.PI * 2.0;
const screenSize = bb.getScreenSize();
const height = (screenSize.x / 2) - 10;
const width = screenSize.y;

for (let x = 0; x < width; x++)
{
	const y = height * Math.sin((twoPI * x) / width) + height;
	bb.moveMouse(x, y);
}

