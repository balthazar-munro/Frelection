/** Renders the built artifact standalone and checks both themes. */
import { chromium } from 'playwright';

const OUT = '/tmp/claude-0/-home-user-Frelection/1142173d-7b0b-5c8e-81ec-a4d1eeb04bb4/scratchpad';
const FILE = 'file:///home/user/Frelection/artifact/frelection.html';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

const report = {};

for (const scheme of ['light', 'dark']) {
  const page = await browser.newPage({
    viewport: { width: 1100, height: 1000 },
    colorScheme: scheme,
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('request', (r) => {
    const u = r.url();
    if (!u.startsWith('file://') && !u.startsWith('data:')) errors.push(`external request: ${u}`);
  });

  await page.goto(FILE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/art-${scheme}-1.png`, fullPage: false });

  const bodyBg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );
  const bodyColor = await page.evaluate(
    () => getComputedStyle(document.body).color,
  );

  // Walk through the quiz to the results screen.
  for (let i = 0; i < 6; i++) {
    await page.waitForTimeout(150);
    const cards = page.locator('div.grid > button');
    const n = await cards.count();
    if (n === 0) break;
    await cards.nth(i % n).click();
  }
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/art-${scheme}-2.png`, fullPage: false });

  const heading = await page.locator('h2').first().textContent();
  const pcts = await page.locator('span.text-2xl').allTextContents();

  // Language toggle still works from the results screen.
  await page.getByRole('button', { name: 'English' }).click();
  await page.waitForTimeout(300);
  const englishHeading = await page.locator('h1').first().textContent();

  report[scheme] = { bodyBg, bodyColor, heading, pcts: pcts.slice(0, 3), englishHeading, errors };
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
