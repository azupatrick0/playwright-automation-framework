import { BasePage } from 'pages/base/BasePage';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInBtn: Locator;
  readonly forgotPasswordLink: Locator;
  readonly otpInput: Locator;
  readonly rememberDeviceCheckbox: Locator;
  readonly confirmOtpBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('cntl-input-email');
    this.passwordInput = page.getByTestId('cntl-password-input-password');
    this.signInBtn = page.getByRole('button', { name: "Sign in", exact: true });
    this.forgotPasswordLink = page.getByRole('link', { name: "Forgot password?" });
    this.otpInput = page.locator('[data-cy="verification-code-otc-input"]');
    this.rememberDeviceCheckbox = page.locator('input.rp-checkbox-input');
    this.confirmOtpBtn = page.getByRole('button', { name: "Confirm" });
  }

  async fillEmail(email: string) {
    await this.fill(this.emailInput, email);
  }

  async fillPassword(password: string) {
    await this.fill(this.passwordInput, password);
  }

  async login(email: string, password: string, otp?: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.click(this.signInBtn);
    if (otp) {
      await this.click(this.rememberDeviceCheckbox);
      await this.fill(this.otpInput, otp);
      await this.click(this.confirmOtpBtn);
    }
  }

  async expectEmptyFieldsError() {
    await this.expectVisible(this.page.locator('text=Email is required'));
    await this.expectVisible(this.page.locator('text=Current Password is required'));
  }

  async expectInvalidEmailError() {
    await this.expectVisible(this.page.locator('text=Email must be a valid email'));
  }

  async expectUnSuccessfullLogin() {
    await this.expectVisible(this.page.locator('text=Invalid email or password'));
  }

  async expectSuccessfullLogin(message: string) {
    await this.expectVisible(this.page.locator(`text=${message}`));
  }
}
