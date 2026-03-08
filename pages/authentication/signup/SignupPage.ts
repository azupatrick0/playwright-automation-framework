import { BasePage } from 'pages/base/BasePage';
import { Page, Locator } from '@playwright/test';
import {  SignupData } from 'utils/types';

export class SignupPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;
  readonly nextBtn: Locator;
  readonly continueBtn: Locator;
  readonly iAmCompanyOption: Locator;
  readonly iAmContractorOption: Locator;
  readonly termsCheckbox: Locator;
  readonly otpInput: Locator;
  readonly countryInput: Locator;
  readonly phoneInput: Locator;
  readonly registerBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId('cntl-input-firstname');
    this.lastNameInput = page.getByTestId('cntl-input-lastname');
    this.emailInput = page.getByTestId('cntl-input-email');
    this.passwordInput = page.getByTestId('cntl-input-password');
    this.submitBtn = page.getByTestId('cntl-submit-company');
    this.nextBtn = page.getByRole('button', { name: "Next" });
    this.continueBtn = page.getByRole('button', { name: "Continue" });
    this.iAmCompanyOption = page.getByText(`I'm a Company`);
    this.iAmContractorOption = page.getByText(`I'm a Contractor`);
    this.termsCheckbox = page.locator('input.custom-control-input');
    this.otpInput = page.locator('[data-cy="verification-code-otc-input"]');
    this.countryInput = page.locator('#react-select-2-input');
    this.phoneInput = page.getByRole('textbox', { name: /phone number/i });
    this.registerBtn = page.getByRole('button', { name: "Register" });
  }

  async selectIAmCompanyOption() {
    await this.click(this.iAmCompanyOption);
  }

  async selectIAmContractorOption() {
    await this.click(this.iAmContractorOption);
  }

  async fillSignupForm(accountType: string, data: SignupData) {
    // Account type
    if (accountType === 'Company') {
      await this.selectIAmCompanyOption();
    } else {
      await this.selectIAmContractorOption();
    }
    
    await this.click(this.termsCheckbox, true);
    await this.fill(this.emailInput, data.email);

    if (accountType === 'Company') {
      await this.click(this.nextBtn);
    } else {
      await this.click(this.continueBtn);
    }

    await this.fill(this.otpInput, '9090');

    // Company/Contractor info
    // Skipping this step in production environment as we cannot get a real otp
  }

  async selectCountry(country: string) {
    await this.click(this.countryInput);
    await this.fill(this.countryInput, country);
    await this.pressKey(this.countryInput, 'Enter');
  }

  async submitForm() {
    await this.click(this.registerBtn);
  }

  async expectSuccessMessage(message: string) {
    await this.expectVisible(this.page.locator(`text=${message}`));
  }
}
