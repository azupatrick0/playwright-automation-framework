import { BasePage } from 'pages/base/BasePage';
import { Page, Locator, expect } from '@playwright/test';

export class HomePage extends BasePage {
  readonly bookDemoBtn: Locator;
  readonly getStartedBtn: Locator;
  readonly spendCard: Locator;
  readonly pricingLink: Locator;
  readonly featuresDropdown: Locator;
  readonly askAILink: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.bookDemoBtn = page.getByRole('link', { name: "Book A Demo" });
    this.getStartedBtn = page.getByRole('link', { name: 'Get Started' });
    this.spendCard = page.getByText('Issue SpendCards instantly to any team member, anywhere in the world.');
    this.pricingLink = page.getByRole('link', { name: "Pricing" });
    this.featuresDropdown = page.getByRole('link', { name: "Pricing" });
    this.askAILink = page.getByRole('link', { name: "Ask AI" });
    this.loginBtn = page.getByRole('link', { name: "Login" });
  }

  async goToBookDemo(nth: number) {
    await this.click(this.bookDemoBtn.nth(nth));
  }

  async goToGetStarted(nth: number) {
    await this.click(this.getStartedBtn.nth(nth));
  }

  async goToSpendCard() {
    await this.click(this.spendCard);
  }

  async goToPricing(nth: number) {
    await this.click(this.pricingLink.nth(nth));
  }

  async goToAskAI(nth: number) {
    await this.click(this.askAILink.nth(nth));
  }
}
