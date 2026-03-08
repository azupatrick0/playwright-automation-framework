import { test } from '@playwright/test';
import { HomePage } from 'pages/home/HomePage';
import { SignupPage } from 'pages/authentication/signup/SignupPage';
import { createTestData } from 'fixtures/testData';

test('Company signup flow', async ({ page }) => {
  const home = new HomePage(page);
  const companySignup = new SignupPage(page);
  const testData = await createTestData();
  const data = testData.signupData;

  await test.step('Navigate to Home page', async () => {
    await home.navigate('/');
  });

  await test.step('Get Started for Companies', async () => {
    await home.goToGetStarted(1);
  });

  await test.step('Attempt signup with empty fields', async () => {
    await home.click(companySignup.nextBtn);
    await companySignup.expectVisible(page.locator('text=Email is required'));
  });

  await test.step('Complete company signup with valid data', async () => {
    const companyFormData = {
      email: data.email,
      password: data.password!,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    }
    await companySignup.fillSignupForm('Company', companyFormData);
    // We are stopping here as we can't continue the process because of otp
    await companySignup.expectSuccessMessage('Invalid code');
  });
});
