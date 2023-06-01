#! /usr/bin/env node

const { program } = require('commander')
const coringa = require('./src/coringa')

program
  .description('A cli tool to mix files contents :)')
  .action(async () => {
    const currentDirectory = process.cwd()
    await coringa(currentDirectory)
  })
  .parse()
