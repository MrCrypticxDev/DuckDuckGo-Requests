const puppeteer = require('puppeteer');

(async () => {

	let query = 'What is Github?';
	let browser = await puppeteer.launch({ headless: true });
	let page = await browser.newPage();
	await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});
	await page.goto(`https://duckduckgo.com?q=${encodeURIComponent(query)}`);
	await page.waitFor('div#links');
	let result = await page.evaluate(() => {
		let results = new Array();
		$('div[data-nir=1]').each((i, e) => {
			results.push({
				title: $(e).find('div h2 a.result__a').text(),
				link: $(e).find('div h2 a.result__a').attr("href"),
				desc: $(e).find('div div.result__snippet.js-result-snippet').text()
			});
		});
		return results;
	});
	console.log(result)

	browser.close();

})();
