const model = "gpt-3.5-turbo"
const previousMessages = [
  {
    role: "user", content: `I will send you a name that can be about a Movie, Series, Manga, Book, Anime or Game, . I need you, based on the name of the media I send, to return some information to me in JSON format. If you can found the information, send it to me. The information I need is the following: name, type of media, description with the maximum of 400 characters or two paragraph with a synopsis of the story,  genre (minimum three, maximum five), one emoji representing the media, author's name is anime/manga/book or director name is film/serie, it is film or series send to me four actors, it is Anime send to me four voice actors, if is Game get back to me the name of the publisher too. Case you couldn't find any information about the media or all information, send to a JSON like this {"error": 404, message: "I'm sorry, but I couldn't find any information about a '{media type}' called "{name send}".}. To you based you response if Manga based in Manga Plus, if Movie or Series based in imdb, if Anime based in MyAnimeList, if is Book based in Goodreads. You can only response in this two ways. Verify the JSON format before send to me. `
  },
  { role: 'user', content: "Example case where you couldn't find some or all information about the media" }, {
    role: 'assistant', content: `{
        "error": 404,
        "message": "I'm sorry, but I couldn't find any information about a '{media type}' called '{name send}'."
      }`
  },
  { role: 'user', content: 'One piece (Manga)' }, {
    role: 'assistant', content: `{
          "name": "One Piece",
          "type": { "name": "Manga" },
          "description": "One Piece is a popular manga series created by Eiichiro Oda. The story follows Monkey D. Luffy, a young pirate with the ability to stretch his body like rubber after eating a cursed fruit. Luffy and his crew, known as the Straw Hat Pirates, embark on an adventurous journey in search of the ultimate treasure known as One Piece, while facing formidable enemies, encountering diverse islands, and forming alliances along the way. With its rich world-building, exciting battles, and endearing characters, One Piece has become one of the best-selling manga series of all time.",
          "genre": [
            { "name": "Action" },
            { "name": "Adventure" },
            { "name": "Comedy" },
            { "name": "Fantasy" }
          ],
          "author": { "name": "Eiichiro Oda" },
          "emoji": "🏴‍☠️"
        }`
  },
  { role: 'user', content: 'Death on the Nile (Book)' }, {
    role: 'assistant', content: `{
          "name": "Death on the Nile",
          "type": { "name": "Book" },
          "description": "Belgian sleuth Hercule Poirot's Egyptian vacation aboard a glamorous river steamer turns into a terrifying search for a murderer when a picture-perfect couple's idyllic honeymoon is tragically cut short",
          "genre": [
            { "name": "Mystery" },
            { "name": "Crime" },
            { "name": "Thriller" },
            { "name": "Drama" }
          ],
          "author": { "name": "Agatha Christie" },
          "emoji": "⚰️"
        }`
  },
  { role: 'user', content: 'Hereditary (Movie)' }, {
    role: 'assistant', content: `{
          "name": "Hereditary",
          "type": {
            "name": "Movie" 
          },
          "description": "Hereditary is a chilling and atmospheric horror film that delves into the terrifying secrets lurking within the Graham family. Following the tragic demise of their reclusive grandmother, the family begins to unravel a web of sinister occurrences and inherited darkness. As they struggle to escape their haunting fate, their lives are consumed by an unimaginable evil. With its intense performances and spine-tingling suspense, Hereditary is a must-watch for horror enthusiasts.",
          "genre": [
            { "name": "Horror" },
            { "name": "Mystery" },
            { "name": "Thriller" }
          ],
          "director": {
            "name": "Ari Aster"
          },
          "actors": [
            { "name": "Toni Collette" },
            { "name": "Alex Wolff" },
            { "name": "Milly Shapiro" },
            { "name": "Gabriel Byrne" }
          ],
          "emoji": "👻"
        }
        `
  },
  { role: 'user', content: 'Hajime no Ippo (Anime)' }, {
    role: 'assistant', content: `{
          "name": "Hajime no Ippo",
          "type": { "name": "Anime" },
          "description": "Hajime no Ippo, also known as 'Fighting Spirit,' is a sports anime series based on the manga by George Morikawa. It tells the story of Ippo Makunouchi, a timid high school student who is frequently bullied. One day, he crosses paths with a professional boxer, Takamura Mamoru, who inspires him to pursue a career in boxing. With  determination and hard work, Ippo begins his journey to become a professional boxer, facing numerous challenges and opponents along the way. This thrilling and heartfelt series explores the themes of perseverance, friendship, and the pursuit of one's dreams.",
          "genre": [ { "name": "Sports" }, { "name": "Drama" }, { "name": "Comedy" } ],
          "author": { "name": "George Morikawa" },
          "voice_actors": [
            { "name": "Kohei Kiyasu" },
            { "name": "Rikiya Koyama" },
            { "name": "Keiji Fujiwara" },
            { "name": "Koichi Yamadera" }
          ],
          "emoji": "🥊"
        }`
  },
  { role: 'user', content: 'Game of Thrones (Series)' }, {
    role: 'assistant', content: `{
          "name": "Game of Thrones",
          "type": { "name": "Series" },
          "description": "Game of Thrones is a highly acclaimed fantasy drama series based on the book series 'A Song of Ice and Fire' by George R.R. Martin. Set in the fictional continents of Westeros and Essos, the series depicts the power struggles, political intrigue, and epic battles among noble families vying for the Iron Throne. With its complex characters, intricate storytelling, and unexpected plot twists, Game of Thrones has become a cultural phenomenon and one of the most watched television series of all time.",
          "genre": [
            { "name": "Fantasy" },
            { "name": "Drama" },
            { "name": "Action" },
            { "name": "Adventure" },
            { "name": "Politics" }
          ],
          "director": { "name": "Various Directors" },
          "actors": [
            { "name": "Peter Dinklage" },
            { "name": "Lena Headey" },
            { "name": "Emilia Clarke" },
            { "name": "Kit Harington" }
          ],
          "emoji": "🐲"
        }`
  },
  { role: 'user', content: 'Outer Wilds (Game)' }, {
    role: 'assistant', content: `{
          "name": "Outer Wilds",
          "type": { "name": "Game" },
          "description": "Outer Wilds is an open-world exploration game set in a small planetary system trapped in an endless time loop. As an astronaut, the player embarks on a journey to uncover the mysteries of the cosmos and the ancient alien race that once inhabited the planets. With a focus on exploration, puzzle-solving, and a captivating narrative, Outer Wilds offers a unique and immersive gaming experience.",
          "genre": [
            { "name": "Adventure" },
            { "name": "Mystery" },
            { "name": "Exploration" },
            { "name": "Puzzle" },
            { "name": "Indie" }
          ],
          "publisher": { "name": "Annapurna Interactive" },
          "emoji": "🚀"
        }
        `
  },
  { role: 'user', content: 'Red Dead Redemption 2 (Game)' }, {
    role: 'assistant', content: `{
          "name": "Red Dead Redemption 2",
          "type": { "name": "Gamer" },
          "description": "Red Dead Redemption 2 is a 2018 action-adventure game developed and published by Rockstar Games. The game is the third entry in the Red Dead series and a prequel to the 2010 game Red Dead Redemption.",
          "genre": [
            { "name": "Action" },
            { "name": "Drama" },
            { "name": "Western" },
            { "name": "Adventure" }
          ],
          "publisher": { "name": "Rockstar Games" },
          "emoji": "🐎"
        }`
  },
  { role: 'user', content: 'Mashle: Magic and Muscles (Anime)' }, {
    role: 'assistant', content: `{
          "name": "Mashle: Magic and Muscles",
          "type": { "name": "Anime" },
          "description": "Mashle: Magic and Muscles is a fantasy-comedy anime series based on the manga written by Hajime Komoto. The story takes place in a world where magic is everything and determines a person's worth. However, Mash Burnedead is a young boy who possesses no magic whatsoever. Despite this, he aspires to become the most powerful magician and enters the magical academy full of strong students. With his incredible physical strength and unyielding determination, Mash relies on his muscles to overcome magical obstacles and tackle the challenges that lie ahead. Mashle: Magic and Muscles is a hilarious and action-packed anime that blends magic and physical prowess in a unique way.",
          "genre": [
            { "name": "Comedy" },
            { "name": "Fantasy" },
            { "name": "Action" }
          ],
          "author": { "name": "Hajime Komoto" },
          "voice_actors": [
            { "name": "Kengo Kawanishi" },
            { "name": "Yuki Hirose" },
            { "name": "Natsuki Hanae" },
            { "name": "Jun Kasama" }
          ],
          "emoji": "�"
        }`
  },
  { role: 'user', content: 'Mashle: Magic and Muscles (Manga)' }, {
    role: 'assistant', content: `{
          "name": "Mashle: Magic and Muscles",
          "type": { "name": "Manga" },
          "description": "Mashle: Magic and Muscles is a fantasy comedy manga series written and illustrated by Hajime Komoto. The story takes place in a world where magic is everything, and those without magic are considered outcasts. Mash Burnedead, a muscular young man with no magical abilities, enrolls in the prestigious Easton Magic Academy. Despite the odds stacked against him, Mash relies on his incredible physical strength and combat skills to overcome challenges, making him a formidable force to be reckoned with. With its unique blend of action, comedy, and fantastical elements, Mashle: Magic and Muscles is an entertaining and lighthearted manga.",
          "genre": [
            { "name": "Action" },
            { "name": "Comedy" },
            { "name": "Fantasy" }
          ],
          "author": { "name": "Hajime Komoto" },
          "emoji": "�"
        }`
  },
  { role: 'user', content: 'The Call of Cthulhu (Book)' }, {
    role: 'assistant', content: `{
          "name": "The Call of Cthulhu",
          "type": { "name": "Book" },
          "description": "The Call of Cthulhu is a cosmic horror short story written by H.P. Lovecraft. The narrative follows a narrator who, through a collection of personal documents and investigations, gradually uncovers the existence of a terrifying and ancient entity known as Cthulhu. As the story progresses, the protagonist delves deeper into a world dominated by otherworldly beings and forbidden knowledge, where humanity's sanity is at stake. Known for its atmospheric dread and intricate mythos, The Call of Cthulhu has become a seminal work in the genre of cosmic horror.",
          "genre": [
            { "name": "Horror" },
            { "name": "Mystery" },
            { "name": "Fantasy" }
          ],
          "author": { "name": "H.P. Lovecraft" },
          "emoji": "�"
        }`
  }
  ]

export {
  model, previousMessages
}