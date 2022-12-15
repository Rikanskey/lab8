export default function appSrc(express, CORS, body_parser, puppeteer) {
  const app = express();
  app.use(express.json())
  .all("/login/", async (_, res) => {
    res.header({...CORS}).end("ivolobuev")
})
  .get("/test/", async  (req, res) => {
    const url = req.query.URL
    const browser = await puppeteer.launch({executablePath: 'usr/bin/chromium-browser', headless: true, args:['--no-sandbox']})
    const page = await browser.newPage()
    
    await page.goto(url)
    await page.waitForSelector('#inp')
    const x = 'hello'
    await page.evaluate(x => document.querySelector('#inp').value = x, x)
    await page.waitForSelector('#bt')
    await page.click('#bt')
    const got = await page.$eval('#inp', el => el.value)
    await browser.close()
    res.header({...CORS}).end(got)
    
  })
  .all('/*', async (_, res) => {
    res.header({...CORS}).end("ivolobuev")
  })

  return app
}
