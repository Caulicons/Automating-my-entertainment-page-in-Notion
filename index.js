
import searchText from './Robot/searchText.js';
import userInputs from './Robot/userInputs.js';

async function start() {

  await userInputs()
  await searchText()

  /* const string = {
    "name": "Nightcrawler",
    "type": "Movie",
    "description": "Nightcrawler is a thrilling crime drama film directed by Dan Gilroy. The story revolves around Lou Bloom , a driven and ambitious young man who discovers the world of freelance crime journalism.As he delves deeper into the dangerous and ethically questionable world, Lou becomes more obsessed with capturing the most shocking and graphic footage to sell to news stations.The film explores themes of morality, the media's responsibility, and the dark side of ambition.",
    "genre": ["Crime", "Drama", "Thriller"],
    "director": "Dan Gilroy",
    "actors": ["Jake Gyllenhaal", "Rene Russo", "Bill Paxton", "Riz Ahmed"]
  }

  const stringify = JSON.stringify(string)
  const parse = JSON.parse(stringify)
  
  console.log(parse) */
}

start()