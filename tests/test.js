const puppeteer = require('puppeteer');
const config = require('config');
const { invokeURL} = require('../src/otc_helper');
const path = require('path');
const fs = require('fs');
const timeout = 150000
jest.setTimeout(160000);

describe(
    '/ (HomeNewTest)',
    () => {
      beforeAll(async () => {
        //Calling function to invoke url
        browser = await puppeteer.launch()
        const pages = await browser.pages();
        const page = pages[0];
        await invokeURL();

      }, timeout)
  
      afterAll(async () => {
      }, timeout
      )
   
        it('Test Case 1: ', async () => {

          var contents = fs.readFileSync("Company.json");
          
          var companyinfo = JSON.parse(contents);
          console.log(companyinfo.length)

          for (i=0;i<companyinfo.length;i++){
            
            console.log("Dealing with company: "+companyinfo[i].Company+"")
            var QuoteFld = await page.waitFor('//*[@id="root"]/div/div[2]/div[1]/div[1]/div/div[1]/input');          
            QuoteFld.click();
            await page.waitFor(2000);
            //-------------------------------------
            // Entering company in Quote fld   ....
            //-------------------------------------
            await QuoteFld.type(companyinfo[i].Company);
            await page.keyboard.press('Enter');
            await page.waitFor(2000);
            
            //-------------------------------------
            //Click on 'Quote' tab....
            //-------------------------------------

            const quotelinkpink = await page.$$('div._3mVdodvw7z:nth-child(3) > a:nth-child(1)');
            //console.log("Pink "+quotelinkpink.length);

            const quotelinkreg = await page.$$('div._2H94cIcGl1:nth-child(3) > a:nth-child(1)');
            //console.log("Non - Pink "+quotelinkreg.length);

            if (quotelinkpink.length > 0){
              console.log("Skipping for "+companyinfo[i].Company+" due to pink type");
              await page.screenshot({path: "./img/"+companyinfo[i].Company+'.png'});
              var companySymbol =  await page.$eval('._2D4XgQ0gJK', el => el.innerText);
              console.log(companySymbol);
              expect(companySymbol).toEqual(companyinfo[i].Company);
              var companyName =  await page.$eval('._1rzoYNl62n', el => el.innerText);
              console.log(companyName);
              expect(companyName).toEqual(companyinfo[i].name);
            }
            else
            {
              const QuoteTab = await page.waitFor('div._2H94cIcGl1:nth-child(3) > a:nth-child(1)'); 
              await QuoteTab.click(); //Click on 'Quote' tab....
              const openVal =  await page.$eval('div._1G7n38q1bb:nth-child(1) > p:nth-child(2)', el => el.innerText);
              console.log("printing open value of "+companyinfo[i].Company+" "+openVal);
              
              var mktCapVal = await page.$eval('div._1G7n38q1bb:nth-child(11) > p:nth-child(2)', el => el.innerText);
              console.log("printing market cap value of "+companyinfo[i].Company+" "+mktCapVal);

              //-------------------------------------
              //Assert the Company Name and Symbol
              //-------------------------------------
              var companySymbol =  await page.$eval('._2D4XgQ0gJK', el => el.innerText);
              console.log(companySymbol);
              expect(companySymbol).toEqual(companyinfo[i].Company);
              var companyName =  await page.$eval('._1rzoYNl62n', el => el.innerText);
              console.log(companyName);
              expect(companyName).toEqual(companyinfo[i].name);

              //-------------------------------------
              //Click on 'Security' tab....
              //-------------------------------------
            
              var SecurityTab = await page.waitFor('div._2H94cIcGl1:nth-child(5) > a:nth-child(1)');
              SecurityTab.click();
              await page.waitFor(2000);
            
              //Capture the value of market cap under security tab here...
              var mktCapValSecurityTab = await page.$eval('div._8AXJn4ourf:nth-child(3) > div:nth-child(2)', el => el.innerText);
              var thisDate = await page.$eval('div._8AXJn4ourf:nth-child(3) > div:nth-child(3)', el => el.innerText);
              
              //passed incorrect mktCapVal to validate my assertion.
              //mktCapVal = "288,785,991,990";
              expect(mktCapVal).toEqual(mktCapValSecurityTab);
              
              console.log("printing market value from security tab..."+mktCapValSecurityTab+" on "+thisDate+".");
              console.log("Verify mktval of overview page... "+mktCapVal+" with  "+mktCapValSecurityTab+" on "+thisDate+"");

              var OverviewTab = await page.waitFor('div._2H94cIcGl1:nth-child(2) > a:nth-child(1)');
              OverviewTab.click();
              await page.waitFor(2000);
              
            }
          }
                    
        }, timeout)

      } )