import fs from 'fs'

export default class File {
  run (filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (error, data) => {
        if (error) {
          reject(error)
        }

        resolve(data)
      })
    })
  }
}
