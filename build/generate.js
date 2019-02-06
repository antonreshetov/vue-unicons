const fs = require('fs')
const path = require('path')
const util = require('util')
const icons = require('unicons/icons.json')

const iconsWithPath = []

icons.forEach(icon => {
  fs.readFile(path.resolve('node_modules/unicons', icon.svg), 'utf-8', (err, file) => {
    if (err) throw err

    file = file.match(/<path.*\/>/g)

    if (file) file = file[0]

    icon.path = file

    iconsWithPath.push(icon)
    fs.writeFileSync(path.resolve(__dirname, '../src/icons.json'), JSON.stringify(iconsWithPath))
  })
})
