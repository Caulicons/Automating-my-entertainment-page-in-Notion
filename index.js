import 'dotenv/config.js'
import searchText from './Robot/searchText.js';
import searchImage from './Robot/searchImage.js';
import userInputs from './Robot/userInputs.js';
import sendToNotion from './Robot/sendToNotion.js';
import sleep from './utils/sleep.js';
import figlet from 'figlet';
import gradient from 'gradient-string';

welcome()

async function welcome() {

  figlet('Welcome to the Notion Bot', (err, data) => {
    console.log(gradient.pastel.multiline(data))
  })
  await sleep()

  await startRobot()
}

export default async function startRobot() {

  await userInputs()
  await searchText()
  await searchImage()
  await sendToNotion()
}