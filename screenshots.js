/* Visual-check helper. Usage: node screenshots.js
   Renders key pages at mobile width to /tmp/ojo_*.png so changes can be eyeballed.
   Requires the dev dependency `playwright` (npm i) and `npx playwright install chromium`. */
const { chromium } = require('playwright');
const path = require('path');

const PAGES = [
  ['home',          () => go('home')],
  ['proj_overview', () => { go('project'); }],
  ['proj_board',    () => { go('project'); setView('By Status'); }],
  ['proj_list',     () => { go('project'); setView('All Tasks'); }],
  ['lead_detail',   () => { go('leads'); openDetail('lead', leads[0].id); }],
  ['task_detail',   () => { openDetail('task', tasks[0].id); }],
  ['emp_dir',       () => go('hr')],
  ['emp_detail',    () => { go('hr'); hrOpenEmp(EMP[0].code); }],
  ['task_focus',    () => { openTaskRec(TASKS[0].id); }],
  ['vendor_rec',    () => { go('vendor'); collOpen(curColl().data()[0].id); }],
  ['account_rec',   () => { go('account'); collOpen(curColl().data()[0].id); }],
];

(async () => {
  const url = 'file://' + path.resolve(__dirname, 'index.html');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERR: ' + e.message));
  await page.goto(url);
  await page.waitForTimeout(400);

  for (const [name, fn] of PAGES) {
    try {
      await page.evaluate(`(${fn.toString()})()`);
    } catch (e) { errs.push(`${name}: ${e.message}`); }
    await page.waitForTimeout(350);
    // does a stacked .dpanel leak into view on mobile?
    const leak = await page.evaluate(() => {
      const ps = [...document.querySelectorAll('.dpanel')];
      return ps.some(p => getComputedStyle(p).display !== 'none' && p.offsetHeight > 0);
    });
    await page.screenshot({ path: `/tmp/ojo_${name}.png` });
    console.log(`${name.padEnd(14)} dpanel-visible=${leak}`);
  }
  console.log('ERRORS:', errs.length ? errs.join('\n') : 'none');
  await browser.close();
})();
