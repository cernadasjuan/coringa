const fs = require('fs')
const path = require('path')

async function getAllFilesInFolder(folderPath) {
  const files = []
  const folderContents = fs.readdirSync(folderPath)

  await Promise.all(
    folderContents.map(async (item) => {
      const itemPath = path.join(folderPath, item)
      const isFile = fs.statSync(itemPath).isFile()

      if (isFile) {
        files.push(itemPath)
      } else {
        const nestedFiles = await getAllFilesInFolder(itemPath)
        files.push(...nestedFiles)
      }
    })
  )

  return files
}

async function coringa(directory, extensionsToExclude = [], roundsOfSort = 3) {
  const files = []
  const contents = []
  const filesInFolder = await getAllFilesInFolder(directory)

  filesInFolder
    .filter((file) =>
      extensionsToExclude.every((extension) => !file.endsWith(extension))
    )
    .forEach((file, index) => {
      files[index] = file
      contents[index] = fs.readFileSync(file)
    })

  for (let i = 0; i < roundsOfSort; i += 1) {
    contents.sort(() => Math.random() * Math.random() - 0.5)
  }

  await Promise.all(
    files.reverse().map(async (file, index) => {
      fs.writeFileSync(file, contents[index])
    })
  )
}

module.exports = coringa
