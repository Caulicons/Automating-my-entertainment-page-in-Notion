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

  const mediaTypes = ['Manga', 'Movie', 'Series', 'Anime']
  let name = ''
  let type = ''

  while (type.length === 0) {
    type = readline.keyInSelect(mediaTypes, chalk.green(`What is the media type of what your want watch ${'?'.repeat(interrogationLength)} `))
  }

  while (name.length === 0) {
    name = readline.question(chalk.green(`What is the name of what your want watch ${'?'.repeat(interrogationLength)} `))
  }
  await file.save({
    name,
    type: mediaTypes[type]
  })
}
