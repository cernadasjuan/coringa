const fs = require('fs')
const coringa = require('../src/coringa')

const files = []

describe('Coringa tests', () => {
  afterEach(() => {
    files.forEach((file) => fs.unlinkSync(file))
  })

  test('with 20 files, mixes all contents', async () => {
    const totalFiles = 20
    let successCases = 0

    for (let i = 0; i < totalFiles; i += 1) {
      const filename = `${__dirname}/${i}.txt`
      fs.writeFileSync(filename, i.toString())
      files.push(filename)
    }

    await coringa(__dirname, ['.js'], 20)

    files.forEach((file, index) => {
      const content = fs.readFileSync(file, 'utf-8')
      if (content !== index.toString()) {
        successCases += 1
      }
    })

    // Expected a success rate of 80% or more
    expect(successCases / totalFiles).toBeGreaterThanOrEqual(0.8)
  })
})
