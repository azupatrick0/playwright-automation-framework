import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/home/HomePage';

test('Page navigation flows', async ({ page }) => {
  const home = new HomePage(page);

  await test.step('Navigate to pricing page', async () => {
    await home.navigate('/');
    await home.goToPricing(0);
    await expect(page).toHaveURL(/.*pricing/);
  });

  await test.step('Navigate to askAI page', async () => {
    await home.goToAskAI(0);
    await expect(page).toHaveURL(/.*ai/);
  });

  await test.step('Navigate to book demo request', async () => {
    await home.goToBookDemo(0);
    await expect(page).toHaveURL(/.*demo-request/);
  });

  await test.step('Navigate to get started for companies/contractor', async () => {
    await home.goToGetStarted(1);
    await expect(page).toHaveURL(/.*signup/);
  });

  await test.step('Navigate to spend card', async () => {
    await home.navigate('/');
    await home.goToSpendCard();
    await expect(page).toHaveURL(/.*spend/);
  });
});
