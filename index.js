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
    headless: true,
    // slowMo: 250,
  };

  const browser = await puppeteer.launch(options);

  async function getDataByName(name) {
    const page = await browser.newPage();
    await page.goto("https://google.com");
    await page.waitForSelector('[title="Pesquisar"]');
    await page.type('[title="Pesquisar"]', `${name} altura`);
    await page.keyboard.press("Enter");

    try {
      await page.waitForSelector('[data-attrid="title"]', { timeout: 2000 });

      const celebrityData = await page.evaluate(() => {
        const name = document.querySelector(
          '[data-attrid="title"] > span'
        ).textContent;
        const subtitle = document.querySelector(
          '[data-attrid="subtitle"] > span'
        ).textContent;
        const heigth = Number(
          document
            .querySelector('[data-attrid="kc:/people/person:height"] > div')
            .textContent.replace(",", ".")
            .replace("m", "")
            .trim()
        );
        return { name, subtitle, heigth };
      });
      console.log(celebrityData);
      await page.close();
    } catch (error) {
      if (error instanceof puppeteer.errors.TimeoutError) {
        console.log(`${name} not found in Google`);
        await page.close();
        return;
      }
    }
  }

  await getDataByName("Michael Jackson");
  await getDataByName("Michael Jordan");
  await getDataByName("Lula");
  await getDataByName("Jair Bolsonaro");
  await getDataByName("Silvio Santos");

  await browser.close();
})();
