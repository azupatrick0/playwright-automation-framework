import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from 'pages/forgot-password/ForgotPasswordPage';
import { createTestData } from 'fixtures/testData';
import { expectApiResponse } from 'utils/apiHelper';
import { HomePage } from 'pages/home/HomePage';
import { LoginPage } from 'pages/authentication/login/LoginPage';

test('Forgot password flow', async ({ page }) => {
  const forgot = new ForgotPasswordPage(page);
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const data = await createTestData();

  await test.step('Navigate to Forgot Password page', async () => {
    await home.navigate('/');
    await home.click(home.loginBtn);
    await login.click(login.forgotPasswordLink);
    await expect(page).toHaveURL(/.*forgot-password/);
  });

  await test.step('Attempt reset with empty email', async () => {
    await forgot.resetPassword('');
    await forgot.expectVisible(page.locator('text=Email is required'));
  });

  await test.step('Submit forgot password with dynamic valid email', async () => {
    await forgot.resetPassword(data.signupData.email);
    await expectApiResponse(page, '/api/password/reset');
    await forgot.expectSuccessMessage(`If your email address exists in our database, you’ll receive an email with instructions to reset your password.`);
  });
});
