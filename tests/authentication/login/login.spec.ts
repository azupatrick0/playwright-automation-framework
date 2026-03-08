import { test } from '@playwright/test';
import { LoginPage } from 'pages/authentication/login/LoginPage';
import { createTestData } from 'fixtures/testData';
import { HomePage } from 'pages/home/HomePage';

test('Login flow', async ({ page }) => {
  const login = new LoginPage(page);
  const home = new HomePage(page);
  const data = await createTestData();

  await test.step('Navigate to Login page', async () => {
    await home.navigate('/');
    await home.click(home.loginBtn);
  });

  await test.step('Try login without credentials', async () => {
    await login.login('', '');
    await login.expectEmptyFieldsError();
  });

  await test.step('Try login with invalid email', async () => {
    await login.login('bad-emailtest.com', 'somepass');
    await login.expectInvalidEmailError();
  });

  await test.step('Try login with wrong password', async () => {
    await login.login(data.signupData.email, 'WrongPass123!');
    await login.expectUnSuccessfullLogin();
  });

  await test.step('Login with valid credentials', async () => {
    await login.login('azupatzero@gmail.com', 'Password2026', '909090'); // Password should stored in github secret as env variables in real world but since this is just for testing purposes we leave it like this
    await login.expectSuccessfullLogin('Invalid code'); // Because we are not using the right otp
  });
});
