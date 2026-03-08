import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/home/HomePage';
import { DemoPage } from 'pages/demo/DemoPage';
import { createTestData } from 'fixtures/testData';

test('Demo request flow', async ({ page }) => {
  const home = new HomePage(page);
  const demo = new DemoPage(page);
  const data = (await createTestData()).demoData;

  await test.step('Navigate to Home page', async () => {
    await home.navigate('/');
  });

  await test.step('Go to book demo', async () => {
    await home.goToBookDemo(0);
    await expect(page).toHaveURL(/.*demo-request/);
  });

  await test.step('Attempt to submit empty demo form', async () => {
    await demo.submitForm();
    await demo.expectVisibleElement('Please complete this required field', 0);
  });

  await test.step('Attempt to submit demo form with an invalid email', async () => {
    await demo.fillEmail('invalidemail');
    await demo.submitForm();
    await demo.expectVisibleElement('Email must be formatted correctly', 0);
  });

  await test.step('Submit demo form with valid data', async () => {
    const demoFormData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      company: data.company,
      phone: data.phone,
      goal: data.goal,
      country: data.country
    }
    await demo.fillDemoForm(demoFormData);
    await demo.submitForm();
    await demo.expectSuccessMessage(/Find a time to meet with|Failed to validate Captcha/i);
  });
});
