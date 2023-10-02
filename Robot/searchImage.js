import { createSpinner } from "nanospinner";
import file from "../utils/handleFile.js";
import customSearchAPI from "@googleapis/customsearch";
const customSearch = new customSearchAPI.VERSIONS.v1()

export default async function searchImage() {
  const content = await file.get()

  const loadingSpinner = createSpinner(`Searching by image`).start();
  const image = await fetchGoogleAndReturnImageLink(content)
  await saveImage(image)

  async function fetchGoogleAndReturnImageLink(content) {
    const response = await customSearch.cse.list({
      auth: process.env.CUSTOM_SEARCH_API,
      cx: process.env.SEARCH_ENGINE_ID,
      q: `${content.name} ${content.type.name}`,
      searchType: 'image',
      num: 1,
      exactTerms: '',
      excludeTerms: 'redd reddit instagram facebook resizing',
    })

    const imageURL = response.data.items.map(item => item.link)[0]

    return imageURL
  }

  async function saveImage(image) {
    const newContent = { ...content, image }
    await file.save(newContent)
    loadingSpinner.success()

  }
}