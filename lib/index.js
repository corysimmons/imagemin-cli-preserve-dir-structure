#!/usr/bin/env node
import meow from 'meow'
import path from 'path'
import shelljs from 'shelljs'
import fs from 'fs-extra'
import isImage from 'is-image'
import chalk from 'chalk'

const cli = meow(`
  Usage
    $ imagemin-dir <input-dir> <output-dir>

  Examples
    $ imagemin-dir src/img dist/img
`, {
  alias: {
    h: 'help'
  }
})

if (cli.input.length === 2) {
  const n = cli.input[0]
  const o = cli.input[1]

  fs.walk(n)
    .on('data', item => {
      if (isImage(item.path)) {
        const inPath = path.resolve(item.path)
        const outPath = path.resolve(item.path.replace(n, o))

        shelljs.echo(`${chalk.green('Minifying')}\n${inPath} to...\n${outPath}\n`)
        shelljs.mkdir('-p',`${path.dirname(outPath)}`)
        shelljs.exec(`node_modules/.bin/imagemin ${inPath} > ${outPath}`)
      }
    })
} else {
  cli.showHelp()
}
