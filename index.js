const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); 
  const page = await browser.newPage();
  const addresses = []; 

  //在这里修改要爬取的页数,格式参考 https://etherscan.io/accounts/100?ps=100
  const startPage = 90;
  const endPage = 100;

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
    const url = `https://etherscan.io/accounts/${pageNumber}?ps=100`;
    console.log(`正在访问页面：${url}`);

    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

   
    await page.waitForSelector('a.me-1 > span', { timeout: 20000 });


    const pageAddresses = await page.evaluate(() => {
      const elements = document.querySelectorAll('a.me-1 > span');
      const results = Array.from(elements)
        .map((element) => element.getAttribute('data-highlight-target'))
        .filter((address) => address !== null); 
      return results;
    });


    addresses.push(...pageAddresses);
  }

  console.log('抓取的地址：', addresses);

  
  fs.writeFileSync('addresses.txt', addresses.join('\n'), 'utf-8');
  console.log('地址已保存到 addresses.txt 文件中');

  await browser.close();
})();
