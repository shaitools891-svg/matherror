const puppeteer = require('puppeteer');

async function testToggleButton() {
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // Set viewport to desktop size first
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1 });

  try {
    // Navigate to the app
    await page.goto('http://localhost:3000');

    // Wait for the page to load
    await page.waitForSelector('body');

    console.log('Page loaded successfully');

    // Check if toggle button is visible on home screen
    const mobileButton = await page.$('.lg\\:hidden button');
    const desktopButton = await page.$('.hidden.lg\\:block button');

    console.log('Mobile button visible:', !!mobileButton);
    console.log('Desktop button visible:', !!desktopButton);

    // Test mobile toggle functionality
    if (mobileButton) {
      console.log('Testing mobile toggle...');

      // Check initial state
      const sidebar = await page.$('.fixed.inset-y-0.left-0.z-50');
      const initialTransform = await page.evaluate(el => el.style.transform, sidebar);
      console.log('Mobile sidebar initial transform:', initialTransform);

      await page.evaluate(() => {
        const button = document.querySelector('.lg\\:hidden button');
        if (button) button.click();
      });
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if sidebar is open
      const transform = await page.evaluate(el => el.style.transform, sidebar);
      console.log('Mobile sidebar transform after click:', transform);

      // Check if overlay is visible
      const overlay = await page.$('.fixed.inset-0.bg-black.bg-opacity-50.z-40');
      const overlayVisible = overlay ? await page.evaluate(el => {
        return el.offsetParent !== null; // Check if element is actually visible
      }, overlay) : false;
      console.log('Mobile overlay visible after click:', overlayVisible);

      // Click again to close
      await page.evaluate(() => {
        const button = document.querySelector('.lg\\:hidden button');
        if (button) button.click();
      });
      await new Promise(resolve => setTimeout(resolve, 500));
      const transform2 = await page.evaluate(el => el.style.transform, sidebar);
      console.log('Mobile sidebar transform after second click:', transform2);

      const overlayVisible2 = overlay ? await page.evaluate(el => {
        return el.offsetParent !== null; // Check if element is actually visible
      }, overlay) : false;
      console.log('Mobile overlay visible after second click:', overlayVisible2);
    }

    // Test desktop toggle functionality
    if (desktopButton) {
      console.log('Testing desktop toggle...');

      // Check initial desktop state
      const sidebar = await page.$('.fixed.inset-y-0.left-0.z-50');
      const initialDesktopTransform = await page.evaluate(el => el.style.transform, sidebar);
      console.log('Desktop sidebar initial transform:', initialDesktopTransform);

      await page.evaluate(() => {
        const button = document.querySelector('.hidden.lg\\:block button');
        if (button) button.click();
      });
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if sidebar is closed
      const transform = await page.evaluate(el => el.style.transform, sidebar);
      console.log('Desktop sidebar transform after click:', transform);

      // Click again to open
      await page.evaluate(() => {
        const button = document.querySelector('.hidden.lg\\:block button');
        if (button) button.click();
      });
      await new Promise(resolve => setTimeout(resolve, 500));
      const transform2 = await page.evaluate(el => el.style.transform, sidebar);
      console.log('Desktop sidebar transform after second click:', transform2);
    }

    // Check console for errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Console errors:', errors);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testToggleButton();