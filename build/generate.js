const fs = require('fs')
const path = require('path')
const unicons = require('unicons/icons.json')
const Handlebars = require('handlebars')
const camelCase = require('lodash.camelcase')
const dist = path.resolve(__dirname, '../src/')

function build () {
  const iconTemplate = fs.readFileSync(path.resolve(__dirname, './icon.hbs'), 'utf-8', err => {
    if (err) console.error(err)
  })

  const icons = unicons.map(icon => {
    let file = fs.readFileSync(path.resolve('node_modules/unicons', icon.svg), 'utf-8', err => {
      if (err) console.error(err)
    })

    // trim spaces, tabs, new lines
    file = file.replace(/\r+|\n+|\t+/gm, '')

    const svgPath = file.match(/<path.*\/>/g)

    if (svgPath) icon.path = svgPath[0]

    const name = camelCase(icon.name)
    icon.nameFormatted = 'uni' + name.charAt(0).toUpperCase() + name.slice(1)

    return icon
  })

  const template = Handlebars.compile(iconTemplate)
  const file = template({ icons })

  // Divided by icon list
  fs.writeFileSync(`${dist}/icons.js`, file)
  // Icons list to demo app
  fs.writeFileSync(`${dist}/demo.json`, JSON.stringify(icons))
}

build()
