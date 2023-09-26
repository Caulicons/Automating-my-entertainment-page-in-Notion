
import searchWikipedia from './Robot/searchWikipedia.js';
import userInputs from './Robot/userInputs.js';

async function start () {
  
  await userInputs()
  await searchWikipedia()
}

start()