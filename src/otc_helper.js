async function invokeURL () {
    try {
    const puppeteer = require('puppeteer');
    const config = require('config');
    const url = (config.Conf.url.testUrl);

    if (!url) {
        throw "Please provide URL as a first argument";
    }

    await page.goto(url,{ waitUntil: 'networkidle2' });
    
    const title = await page.title();
    console.log("Page Title : "+title);
    await page.screenshot({path: './img/screenshot.png'});
    
    }catch (error) {
        console.log("error while invoking the page");
        return error
    }
}

module.exports = {invokeURL}