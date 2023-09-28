import 'dotenv/config';
import file from "../utils/handleFile.js";
import OpenAI from "openai";
import shellLoading from '../utils/loadingAnimation.js';
import readline from 'readline-sync';
import chalk from 'chalk';
import userInputs from './userInputs.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function searchText() {
  const content = await file.get();

  /* start loading animation */
  const interval = shellLoading(`Searching for ${content.name}`)

  await startTextBot();

  /* Stop loading animation */
  clearInterval(interval)


  async function startTextBot() {

    /*  Bot Config */
    const model = "gpt-3.5-turbo"
    const messages = [
      {
        role: "user", content: `I will send you a name that can be about a Movie, Series, Manga, Anime, Cartoon. I need you, based on the name of the media I send, to return some information to me in JSON format. If you can found the information, send it to me. The information I need is the following: name, type of media, description with the maximum of 400 characters or two paragraph with a synopsis of the story,  genre (minimum three, maximum five), author's name is anime/manga or director name is film/serie/cartoon, it is film or series send to me the four actors, it is serie send to me four voice actors. Case you couldn't find any information about the media, send to a JSON like this {"error": 404, message: "I'm sorry, but I couldn't find any information about a media called "{name send}".}. To you based you response  if Manga based in Manga Plus, if Movie or Series based in imdb,  if Anime based in MyAnimeList`
      },
      { role: 'user', content: "Example case you couldn't find some information about the media, fiction input name is 'asdfasdf (movie)'" }, {
        role: 'assistant', content: `{
        "error": 404,
        "message": "I'm sorry, but I couldn't find any information about a media called 'asdfasdf'."
      }`
      },
      { role: 'user', content: 'One piece (Anime)' }, {
        role: 'assistant', content: `
      "name": "One Piece",
      "type": "Manga",
      "description": "One Piece is a Japanese manga series written and illustrated by Eiichiro Oda. It follows the adventures of Monkey D. Luffy and his pirate crew in search of the ultimate treasure, the One Piece. With its vast world-building, epic story telling, and memorable characters, One Piece has become one of the most popular and enduring manga series of all time.",      
      "genre": ["Action", "Adventure", "Fantasy", "Comedy"],
      "author": "Eiichiro Oda"
    `
      },
      { role: 'user', content: 'Hereditary (Movie)' }, {
        role: 'assistant', content: `{
      "name": "Hereditary",
      "type": "Series",
      "description": "Hereditary is a suspenseful and chilling series that explores the dark secrets and supernatural occurrences within the Graham family. As the family unra
  vels the mysteries of their ancestry, they discover a deeply disturbing legacy that threatens to consume them all. With its atmospheric storytelling and haunting performanc
  es, Hereditary takes viewers on a gripping journey into the depths of psychological horror.",
      "genre": ["Horror", "Thriller", "Mystery"],
      "director": "Ari Aster"
  }`
      },
      {
        role: 'user', content: `${content.name} (${content.type})`
      }]

    /* Bot start */
    const bot = await openai.chat.completions.create({
      model,
      messages
    });

    handlePrompt(bot)
  }

  async function handlePrompt(bot) {

    /* 
      expect json like this : {
        "name": "Nightcrawler",
        "type": "Movie",
        "description": "something",
        "genre": ["Crime", "Drama", "Thriller"],
        "director": "Dan Gilroy",
        "actors": ["Jake Gyllenhaal", "Rene Russo", "Bill Paxton", "Riz Ahmed"]
      } or error like this : {
        "error": 404,
        "message": "I'm sorry, but I couldn't find any information about a media called 'NightNight'."
      }
    */
    const draftJSON = bot.choices[0].message.content
    const draft = JSON.parse(draftJSON)

    if (draft.error)
      await handleError(draft.message)

    const questionDraft = readline.keyInYN(chalk.blue(`This answer are good for you: \n ${chalk.bold(draftJSON)}`))

    if (!questionDraft)
      await handleError()

    await file.save(draft)
  }

  async function handleError(comment) {

    const retry = readline.keyInYN(chalk.yellow(`\n ${comment ?? ''} Want to try again ? \n`))

    if (retry) {
      await userInputs()
      await searchText()
    } else {
      console.log('\n oh... It\'s ok... bye! \n');
      process.exit()
    }
  }
}

