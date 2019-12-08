const fs = require('fs')
const path = require('path')
const uniconsLine = require('unicons/json/line.json')
const uniconsMonochrome = require('unicons/json/monochrome.json')
const Handlebars = require('handlebars')
const camelCase = require('lodash.camelcase')
const dist = path.resolve(__dirname, '../src/')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const chalk = require('chalk')

function upperFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function format (icons) {
  return icons.map(icon => {
    return readFile(
      path.resolve('node_modules/unicons', icon.svg),
      'utf-8'
    ).then(svg => {
      // add formatted name
      const name = camelCase(icon.name)
      icon.nameFormatted = 'uni' + upperFirstLetter(name)

      if (icon.style === 'monochrome') {
        icon.nameFormatted += upperFirstLetter(icon.style)
      }
      // trim spaces, tabs, new lines from svg
      svg = svg.replace(/\r+|\n+|\t+/gm, '')
      // unwrap svg
      const re = /<svg.*?>(.*?)<\/svg>/g
      const unwrappedSvg = re.exec(svg)
      // style name uniformity
      icon.style = icon.style.toLowerCase()
      // add svg path to icon
      if (unwrappedSvg) icon.path = unwrappedSvg[1]

      return icon
    })
  })
}

function generate () {
  const p1 = format(uniconsLine)
  const p2 = format(uniconsMonochrome)
  // await promises
  Promise.all([...p1, ...p2]).then(icons => {
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
