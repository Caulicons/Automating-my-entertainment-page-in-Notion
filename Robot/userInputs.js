import readline from 'readline-sync'
import chalk from 'chalk';
import file from '../utils/handleFile.js';

let interrogationLength = 1
export default async function userInputs() {

  if (interrogationLength === 3 || interrogationLength === 9) {
    const answer = readline.question(chalk.bgRed(`you want stay here ? `), {
      trueValue: ['yes', 'yeah', 'yep', 'sim', 'claro'],
      falseValue: ['no', 'nah', 'nope', 'não', 'nunca mais', 'roberto carlos']
    })

    if (answer === false) {
      console.log('Oh... It\'s ok...');
      return
    }
    
    console.log('Great, let\'s go!');
  }

  const userInput = readline.question(chalk.green(`What is the name of what your want watch ${'?'.repeat(interrogationLength)} `))

  if (userInput.length === 0 && interrogationLength < 11) {
    interrogationLength++
    return userInputs()
  }

  await file.save({
    name: userInput
  })
}
