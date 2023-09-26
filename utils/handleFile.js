import fs from 'fs/promises';

const file = {
  save: async function (content) {
    try {
      await fs.writeFile('data/content.json', JSON.stringify(content), (err) => {
        if (err) throw err
        console.log('File created and saved successfully.')


      })
    } catch (error) {
      console.log(error)
    }
  },
  get: async function () {
    const content = await fs.readFile('data/content.json', 'utf-8')
    return JSON.parse(content)
  }
}
export default file;