import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator, force?: boolean) {
    await locator.click({ force });
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async pressKey(locator: Locator, value: string) {
    await locator.press(value);
  }

  async selectOption(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
}
