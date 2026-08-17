/** Drives the running dev server through a full user journey. */
import { chromium } from 'playwright';

const OUT = '/tmp/claude-0/-home-user-Frelection/1142173d-7b0b-5c8e-81ec-a4d1eeb04bb4/scratchpad';
const BASE = 'http://localhost:4321';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const ctx = await browser.newContext({
  viewport: { width: 1100, height: 950 },
  permissions: ['clipboard-read', 'clipboard-write'],
});
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e}`));
page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
page.on('response', (r) => {
  if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`);
});

const step = {};

// --- 1. Land on the French site, blind by default.
await page.goto(`${BASE}/fr/`, { waitUntil: 'networkidle' });
step.blindChips = await page.locator('span[title]').count();
await page.screenshot({ path: `${OUT}/run-1-landing.png` });

// --- 2. Reveal, then hide again.
await page.getByRole('button', { name: 'Afficher les partis' }).click();
await page.waitForTimeout(250);
step.revealedChips = await page.locator('span[title]').count();
await page.getByRole('button', { name: 'Masquer les partis' }).click();
await page.waitForTimeout(200);
step.rehiddenChips = await page.locator('span[title]').count();

// --- 3. Mark this topic as mattering a lot.
await page.getByRole('button', { name: 'Beaucoup', exact: true }).click();
await page.waitForTimeout(150);

// --- 4. Answer as a consistently left-leaning user: pick the option whose
//        label matches the roll-back / broad-regularisation family each time.
const leftLabels = [
  'Revenir sur les restrictions',
  'Régularisation large',
  'Maintenir et faciliter',
  'Revenir sur les durcissements',
  'Égalité des droits sociaux',
  'Abroger les lois restrictives',
];
step.picked = [];
for (const label of leftLabels) {
  const card = page.locator('div.grid > button').filter({ hasText: label }).first();
  if (await card.count()) {
    await card.click();
    step.picked.push(label);
  } else {
    // Fall back so the run continues even if a label shifts.
    await page.locator('div.grid > button').first().click();
    step.picked.push(`(fallback for "${label}")`);
  }
  await page.waitForTimeout(180);
}

await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/run-2-results.png`, fullPage: false });

// --- 5. Read the ranking off the results screen.
step.ranking = await page.evaluate(() =>
  Array.from(document.querySelectorAll('ol > li')).map((li) => ({
    party: li.querySelector('span.font-semibold')?.textContent?.trim(),
    pct: li.querySelector('span.text-2xl')?.textContent?.trim(),
  })),
);

// --- 6. Expand the closest party and count its agreements / conflicts.
step.agreementCount = await page.evaluate(() => {
  const heads = Array.from(document.querySelectorAll('h3'));
  const agree = heads.find((h) => h.textContent?.includes('D’ACCORD') || h.textContent?.includes("D'ACCORD"));
  return agree?.nextElementSibling?.querySelectorAll('li').length ?? 0;
});

// --- 7. Share link: must be a fragment, and must round-trip the version.
await page.getByRole('button', { name: 'Copier le lien de mes résultats' }).click();
await page.waitForTimeout(400);
const clip = await page.evaluate(() => navigator.clipboard.readText());
step.shareIsFragment = clip.includes('#r=');
step.shareHasNoQuery = !clip.includes('?');
try {
  const decoded = JSON.parse(decodeURIComponent(atob(clip.split('#r=')[1])));
  step.shareVersion = decoded.v;
  step.shareAnswerCount = Object.keys(decoded.a).length;
} catch (e) {
  step.shareDecodeError = String(e);
}
step.shareButtonConfirms = await page
  .getByRole('button', { name: 'Lien copié' })
  .count();

// --- 8. Methodology page renders.
await page.goto(`${BASE}/fr/methodologie/`, { waitUntil: 'networkidle' });
step.methodologyHeadings = await page.locator('h2').allTextContents();
await page.screenshot({ path: `${OUT}/run-3-methodologie.png`, fullPage: true });

// --- 9. English route.
await page.goto(`${BASE}/en/`, { waitUntil: 'networkidle' });
step.englishH1 = await page.locator('h1').first().textContent();
step.englishBanner = await page.locator('body').innerText().then((s) => s.slice(0, 90));

// --- 10. Skip and "none of these" paths still reach a sane state.
await page.goto(`${BASE}/fr/`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Passer' }).click();
await page.waitForTimeout(200);
await page.getByRole('button', { name: 'Aucune de ces propositions' }).click();
await page.waitForTimeout(200);
step.afterSkipAndNone = await page.locator('h2').first().textContent();
// Two "answers" but neither scores anyone -> below the results threshold.
await page.locator('text=Voir mes résultats').click();
await page.waitForTimeout(300);
step.insufficientShown = (await page.locator('text=trop peu de questions').count()) > 0;
await page.screenshot({ path: `${OUT}/run-4-insufficient.png` });

await browser.close();
console.log(JSON.stringify({ ...step, errors }, null, 2));
