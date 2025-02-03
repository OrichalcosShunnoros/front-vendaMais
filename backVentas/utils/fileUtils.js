const fs = require('fs')

const readFile = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
  } catch (error) {
    console.error(`Error reading ${file}:`, error)
    return []
  }
}

const writeFile = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing to ${file}:`, error)
  }
}

module.exports = { readFile, writeFile }
