const fs = require('fs')
const path = require('path')
const unicons = require('@iconscout/unicons/icons.json')
const Handlebars = require('handlebars')
const camelCase = require('lodash.camelcase')
const dist = path.resolve(__dirname, '../src/')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const chalk = require('chalk')

function generate () {
  const promises = unicons.map(icon => {
    return readFile(
      path.resolve('node_modules/@iconscout/unicons', icon.svg),
      'utf-8'
    ).then(svg => {
      // add formatted name
      const name = camelCase(icon.name)
      icon.nameFormatted = 'uni' + name.charAt(0).toUpperCase() + name.slice(1)
      // trim spaces, tabs, new lines from svg
      svg = svg.replace(/\r+|\n+|\t+/gm, '')
      // get svg path
      const svgPath = svg.match(/<path.*\/>/g)
      // add svg path to icon
      if (svgPath) icon.path = svgPath[0]

      return icon
    })
  })
  // await promises
  Promise.all(promises).then(icons => {
    // get icon template
    const iconTemplate = fs.readFileSync(
      path.resolve(__dirname, './icon.hbs'),
      'utf-8',
      err => {
        if (err) console.error(err)
      }
    )
    // compile icon list
    const template = Handlebars.compile(iconTemplate)
    const iconList = template({ icons })
    // Divided by icon list
    fs.writeFile(`${dist}/icons.js`, iconList, err => {
      if (err) console.error(err)
    })
    // Icons list to demo app
    fs.writeFile(`${dist}/demo.json`, JSON.stringify(icons), err => {
      if (err) console.error(err)
    })
    console.log(chalk.green('All done'))
  })
}

generate()
