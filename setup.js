const chalk = require('chalk')
const puppeteer = require('puppeteer')
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')
const config = require('config');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

module.exports = async function() {
  console.log(chalk.green('Setup Puppeteer'))

  const browser = await puppeteer.launch({
    headless: false,
    slowmo: 80,
    args: [`--window-size=1680,980`]
  })
  // This global is not available inside tests but only in global teardown
  global.__BROWSER_GLOBAL__ = browser
  console.log("-------------------------------------------------------------------------------------");
  console.log("####################################################################################-");
  // Instead, we expose the connection details via file system to be used in tests
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());

}
