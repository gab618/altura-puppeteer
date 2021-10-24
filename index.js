const puppeteer = require("puppeteer-core");

(async () => {
  const chromeExecPaths = {
    win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    linux: "/opt/google/chrome/google-chrome",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  };

  const exePath = chromeExecPaths[process.platform];
  const options = {
    args: [],
    executablePath: exePath,
    headless: false,
    slowMo: 250,
  };

  const browser = await puppeteer.launch(options);

  //start
  const page = await browser.newPage();
  await page.goto("https://google.com");
  // await browser.close();
})();
