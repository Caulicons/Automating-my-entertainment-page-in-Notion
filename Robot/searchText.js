import file from "../utils/handleFile.js";
import OpenAI from "openai";
import chalk from 'chalk';
import userInputs from './userInputs.js';
import { model, previousMessages } from '../utils/openaiConfig.js';
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function searchText() {
  const content = await file.get();

  const loadingSpinner = createSpinner(`Searching some info about ${content.name} - ${content.type}`).start();
  await startTextBot(content);

  async function startTextBot(content) {
    /* Bot start */
    const bot = await openai.chat.completions.create({
      model,
      messages: [...previousMessages, {
        role: 'user', content: `${content.name} (${content.type})`
      }]
    });

    await handlePrompt(bot)
  }

  async function handlePrompt(bot) {

    /* Catch response */
    const draft = JSON.parse(bot.choices[0].message.content)

    /* To debugger use the lines below */
    //console.log('first', bot.choices[0].message.content)
    //console.log('draft', draft)

    /* Check openAi response */
    if (draft.error || !draft.name)
      return await handleError(draft.message)

    /* Question user response */
    loadingSpinner.stop()
    console.log(chalk.blue(`Search Data: ` + '\n'))
    console.log(draft)
    const questionDraft = await inquirer.prompt({
      name: 'check_draft',
      type: 'confirm',
      message: `${chalk.blue('This answer are good for you:')}`,
    })

    if (!questionDraft)
      return await handleError(draft.message)
    /* Save draft */
    await file.save(draft)
    loadingSpinner.success()
  }

  async function handleError(comment) {
    loadingSpinner.stop()

    const retry = await inquirer.prompt({
      name: 'check_draft',
      type: 'confirm',
      message: `${chalk.redBright(`\n ${comment ?? ''} Want to try again ?`)}`,
    })

    if (retry) {
      await userInputs()
      await searchText()
    } else {
      console.log('\n oh... It\'s ok... bye! \n');
      process.exit()
    }
  }
}