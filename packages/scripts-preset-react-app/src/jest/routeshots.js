/* eslint-disable no-undef */
import {
	spawn
} from 'child_process';
import path from 'path';
import puppeteer from 'puppeteer';
import {
	toMatchImageSnapshot
} from 'jest-image-snapshot';

expect.extend({
	toMatchImageSnapshot
});

// We consider taking the full page is a reasonnable default.
function defaultScreenshotOptions() {
	return {
		fullPage: true
	};
}

const noop = () => {};

const asyncNoop = async () => {};
const defaultConfig = {
	url:                  'http://localhost:3000',
	chromeExecutablePath: undefined,
	getMatchOptions:      noop,
	getScreenshotOptions: defaultScreenshotOptions,
	beforeScreenshot:     noop,
	getGotoOptions:       noop,
	customizePage:        asyncNoop,
	getCustomBrowser:     undefined,
	launch:               {}
};

export default function initRouteshots(routes, customConfig = {}) {

	const server = spawn('node', [
		path.join(__dirname, '..', 'start')
	], {
		cwd: process.cwd()
	});
	const {
		url,
		chromeExecutablePath,
		getMatchOptions,
		getScreenshotOptions,
		beforeScreenshot,
		getGotoOptions,
		customizePage,
		getCustomBrowser,
		...config
	} = {
		...defaultConfig,
		...customConfig
	};
	// add some options "no-sandbox" to make it work properly on some Linux systems as proposed here: https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322851507
	const launchConfig = {
		args:           [
			'--no-sandbox ',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage'
		],
		executablePath: chromeExecutablePath,
		...config.launch
	};
	let browser = null; // holds ref to browser. (ie. Chrome)
	let page = null; // Hold ref to the page to screenshot.

	describe('Routeshots', () => {

		beforeAll(async () => {

			if (getCustomBrowser) {
				browser = await getCustomBrowser();
			} else {
				browser = await puppeteer.launch(launchConfig);
			}

			await new Promise(resolve => server.stdout.once('data', resolve));

			page = await browser.newPage();

			await page.setRequestInterception(true);
			page.on('request', (interceptedRequest) => {

				const url = interceptedRequest.url();

				if (url.includes('socket.io') || url.includes('__webpack_hmr')) {
					interceptedRequest.abort();
					return;
				}

				interceptedRequest.continue();
			});

			await page.goto(url);
			await page.waitFor('#view');
		});

		afterAll(() => {

			server.kill();

			if (getCustomBrowser && page) {
				return page.close();
			}

			return browser.close();
		});

		routes.forEach((route) => {

			it(route, async () => {

				if (!browser || !page) {
					throw new Error('no-headless-browser-running');
				}

				expect.assertions(1);

				await customizePage(page);
				await page.goto(`${url}${route}`, getGotoOptions(route));
				await beforeScreenshot(page, route);

				const image = await page.screenshot(getScreenshotOptions(route));

				expect(image).toMatchImageSnapshot({
					...getMatchOptions(route),
					customSnapshotIdentifier: `Route__${route.replace(/^[^\w]|[^\w]$/g, '').replace(/[^\w]/g, '-')}`
				});
			});
		});
	});
}
