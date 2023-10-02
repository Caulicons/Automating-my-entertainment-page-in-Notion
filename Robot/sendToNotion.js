import { Client } from "@notionhq/client";
import file from '../utils/handleFile.js';
import chalk from 'chalk';
import { createSpinner } from "nanospinner";
const notion = new Client({
  auth: process.env.NOTION_KEY
})
export default async function notionRobot() {
  const content = await file.get();
  const loadingSpinner = createSpinner(`Send to Notion`).start();

  const contentSanitized = handleMedia(content)

  const newPost = await notion.pages.create({
    parent: {
      "type": "database_id",
      database_id: contentSanitized.database_id
    },
    cover: {
      external: {
        url: content.image
      }
    },
    icon: {
      type: "emoji",
      emoji: content.emoji
    },
    properties: {
      title: {
        title: [
          {
            "type": "text",
            text: {
              "content": content.name
            }
          }
        ]
      },
      ...contentSanitized.properties,
    },
    children: [
      {
        type: "image",
        image: {
          type: "external",
          external: {
            url: content.image
          }
        }
      },
      {
        type: "heading_2",
        heading_2: {
          rich_text: [
            {
              "type": "text",
              text: {
                "content": "Synopsis"
              }
            }
          ]
        }
      },
      {
        type: "quote",
        quote: {
          rich_text: [
            {
              "type": "text",
              text: {
                "content": content.description
              }
            }
          ]
        }
      },
      {
        type: "heading_2",
        heading_2: {
          rich_text: [
            {
              "type": "text",
              text: {
                "content": "Notes"
              }
            }
          ]
        }
      },
    ]
  }
  )

  /* To debugger the response   */
  //console.log('response :', newPost)

  loadingSpinner.success({ text: `Everything went fine, here you URL : ${chalk.green(newPost.url)}` })
}

function handleMedia(content) {

  if (
    content.type.name === 'Anime' ||
    content.type.name === 'Movie' ||
    content.type.name === 'Series'
  ) {

    return {
      database_id: process.env.NOTION_DATABASE_SEVENTH_ART,
      properties: {
        'When I started': { id: '%3Euip', type: 'date', date: null },
        'Where I stopped': { id: 'FaXg', type: 'rich_text', rich_text: [] },
        'Where to watch': { id: 'UrFa', type: 'url', url: null },
        Note: { id: 'mcy%3F', type: 'select', select: null },
        Genre: { id: 'bQJB', type: 'multi_select', multi_select: content.genre },
        Actors: { id: 'b%5Ccd', type: 'multi_select', multi_select: content.actors || content.voice_actors },
        'Director/Autor': { id: 'o%3Ar%7D', type: 'select', select: content.director || content.author || content.creator },
        Status: { id: 'oJFJ', type: 'select', select: { name: 'Wanting to Watch' } },
        Type: { id: '%7B%40cU', type: 'select', select: content.type },
      }
    }
  }

  if (
    content.type.name === 'Manga' ||
    content.type.name === 'Book'
  ) {
    return {
      database_id: process.env.NOTION_DATABASE_READING_LIST,
      properties: {
        'When I started': { id: '%3Euip', type: 'date', date: null },
        'Where I stopped': { id: 'FaXg', type: 'rich_text', rich_text: [] },
        'Where Read': { id: 'UrFa', type: 'url', url: null },
        Note: { id: 'mcy%3F', type: 'select', select: null },
        Genre: { id: 'bQJB', type: 'multi_select', multi_select: content.genre },
        Author: { id: 'o%3Ar%7D', type: 'select', select: content.director || content.author || content.creator },
        Status: { id: 'oJFJ', type: 'select', select: { name: 'Wanting Read' } },
        Type: { id: '%7B%40cU', type: 'select', select: content.type },
      }
    }
  }

  if (
    content.type.name === 'Game'
  ) {
    return {
      database_id: process.env.NOTION_DATABASE_GAMES_REVIEW,
      properties: {
        Genre: { id: 'bQJB', type: 'multi_select', multi_select: content.genre },
        Publisher: { id: 'o%3Ar%7D', type: 'select', select: content.publisher },
        Status: { id: 'oJFJ', type: 'status', status: { name: 'Wishlist' } },
        'Time Playing': { id: 'owBb', type: 'date', date: null },
        Note: { id: 'epyF', type: 'select', select: null }
      }
    }
  }
}
