import chalk from 'chalk';
import file from '../utils/handleFile.js';
import inquirer from 'inquirer';

export default async function userInputs() {
  const mediaTypes = ['Manga', 'Book', 'Movie', 'Series', 'Anime', 'Game']

  const mediaType = await askType()
  const mediaName = await askMediaName()

  async function askType() {

    const answers = await inquirer.prompt({
      name: 'media_type',
      type: 'list',
      message: `What is the media type of what your want watch ? `,
      choices: mediaTypes
    })
    
    return answers.media_type
  }

  async function askMediaName() {

    const answers = await inquirer.prompt({
      name: 'media_name',
      type: 'input',
      message: `What is the name of what your want watch ? `,
      validate: (value) => {

        if (value.length === 0) {
          console.log(chalk.red('Please enter with a name.'))
          return false
        }
        
        return true
      },
    })

    return answers.media_name;
  }

  await file.save({
    name: mediaName,
    type: mediaType
  })
}
