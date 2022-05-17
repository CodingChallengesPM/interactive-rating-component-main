const puppeteer = require('puppeteer');

const baseUrl = 'http://localhost:5500';

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

describe('index.html renders correctly', () => {

  test('has image with alt text `An image of a star`', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('aside');
    const result = await page.evaluate(() => {
      return document.querySelector('img[alt="An image of a star"]');
    });
    expect(result).toBeTruthy();
  });

  test('h2 is present on the page', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('h2');
    const result = await page.evaluate(() => {
      return document.querySelector('h2').innerText;
    });
    expect(result).toEqual('How did we do?');
  });

  test('first paragraph has text of `mockString`', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('form');
    const mockString =
      'Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!';
    const result = await page.evaluate(() => {
      return document.querySelector('.cta').innerText;
    });

    expect(result).toEqual(mockString);
  });

  test('has 5 input elements', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('form');
    const result = await page.evaluate(() => {
      return [...document.querySelectorAll('form label')].map(
        (el) => el.innerText
      );
    });
    expect(result.length).toEqual(5);
  });

  test('has button with submit text ', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('form');
    const result = await page.evaluate(() => {
      return document.querySelector('button').innerText;
    });
    expect(result).toEqual('Submit');
  });
});

afterAll(async () => {
  await browser.close;
});
