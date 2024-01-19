import { promisify } from 'util';
import { exec } from 'child_process';
import puppeteer from 'puppeteer';
import ffmpegPath from 'ffmpeg-static';

const url = 'https://www.wunderground.com/forecast/us/pa/glenside/KPAGLENS57';
const videoUrl = 'https://www.ventusky.com/?p=40.3;-75.4;4&l=temperature-2m';

const execPromise = promisify(exec);

export async function getVideo() {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1280,
      height: 720
    }
  });
  const page = await browser.newPage();

  await page.goto(videoUrl);

  await page.waitForSelector('a.q.t');

  const playButton = await page.$('a.q.t span');

  await playButton.click();

  await new Promise((r) => setTimeout(r, 5000));

  const hideElems = [
    'menu',
    '#header',
    'a.c',
    '.hv.nx.bb',
    '.hv.l.bb',
    '.hv.h.bb',
    '.z.x',
    '.z.b',
    '#i',
    '#p',
    '#k',
    '#d'
  ];

  for (const selector of hideElems) {
    await page.$eval(selector, (elem) => (elem.style.display = 'none'));
  }

  const recorder = await page.screencast({
    ffmpegPath,
    path: 'test.webm'
  });

  return new Promise((resolve) => {
    setTimeout(async () => {
      await recorder.stop();
      await browser.close();
      await execPromise(`${ffmpegPath} -i test.webm -pix_fmt rgb24 test.gif`);
      resolve();
    }, 5000);
  });
}

export async function getScreenshot() {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  await page.goto(url);

  await Promise.race([
    page.waitForSelector('button.close'),
    new Promise((r) => setTimeout(r, 5000))
  ]);

  const closeButton = await page.$('button.close');

  if (closeButton) {
    await closeButton.click();
  } else {
    console.dir(await page.$$eval('button', (el) => el.textContent));
  }

  await page.waitForSelector('.charts-container');

  const container = await page.$('.charts-container');
  const rect = await container.boundingBox();

  const screenshot = await page.screenshot({ clip: rect });

  await browser.close();

  return screenshot;
}
