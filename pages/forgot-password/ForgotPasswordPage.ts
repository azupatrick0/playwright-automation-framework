import { BasePage } from 'pages/base/BasePage';
import { Page, Locator } from '@playwright/test';

export class ForgotPasswordPage extends BasePage {
  readonly emailInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('cntl-input-email');
    this.submitBtn = page.getByRole('button', { name: "Send reset link" });
  }

  async resetPassword(email: string) {
    await this.fill(this.emailInput, email);

    await this.click(this.submitBtn);
  }

  async expectSuccessMessage(message: string) {
    await this.expectVisible(this.page.locator(`text=${message}`));
  }
}
