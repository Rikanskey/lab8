export default function appSrc(express, CORS, body_parser, puppeteer) {
  const app = express();
  app.use(express.json())
  .all("/login/", async (_, res) => {
    res.header({...CORS}).end("ivolobuev")
})
  .get("/test/", async  (req, res) => {
    const url = req.query.URL
    const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']})
    console.log(browser)
    const page = browser.newPage()
    
    page.goto(url)
    page.waitForSelector('#inp')
    const x = 'hello'
    page.evaluate(x => document.querySelector('#inp').value = x, x)
    page.waitForSelector('#bt')
    page.click('#bt')
    const got = page.$eval('#inp', el => el.value)
    browser.close()
    res.header({...CORS}).end(got)
    
  })
  .all('/*', async (_, res) => {
    res.header({...CORS}).end("ivolobuev")
  })

  return app
}