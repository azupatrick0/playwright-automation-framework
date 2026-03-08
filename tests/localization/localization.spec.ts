import { test, expect } from '@playwright/test';
import { LocalizationPage } from 'pages/localization/LocalizationPage';

test('Localization flow - switch language to Arabic and back to English', async ({ page }) => {
  const localization = new LocalizationPage(page);

  await test.step('Navigate to Home page', async () => {
    await localization.navigate('/');
  });

  await test.step('Switch language to Arabic dynamically', async () => {
    await localization.switchToArabic();
    await expect(page).toHaveURL(/.*ar/);
    await localization.expectVisible(page.locator('text=بسّط إدارة الموارد البشرية والرواتب والإنفاق الخاصة بك'));
  });

   await test.step('Switch language to English dynamically', async () => {
    await localization.switchToEnglish();
    await localization.expectVisible(page.locator('text=Simplify your HR, Payroll and Spend Management'));
  });
});
