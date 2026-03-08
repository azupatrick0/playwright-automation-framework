import { BasePage } from 'pages/base/BasePage';
import { Page, Locator } from '@playwright/test';

export class LocalizationPage extends BasePage {
  readonly englishLanguageButton: Locator;
  readonly arabicLanguageButton: Locator;
  readonly arabicOption: Locator;
  readonly englishOption: Locator;

  constructor(page: Page) {
    super(page);
    
    this.englishLanguageButton = page.getByRole('button', { name: 'EN', exact: true });
    this.arabicLanguageButton = page.getByRole('button', { name: 'AR', exact: true });
    this.arabicOption = page.getByRole('link', { name: 'AR', exact: true  });
    this.englishOption = page.getByRole('link', { name: 'EN', exact: true });
  }

  async switchToArabic() {
    await this.click(this.englishLanguageButton);
    await this.click(this.arabicOption);
  }

  async switchToEnglish() {
    await this.click(this.arabicLanguageButton);
    await this.click(this.englishOption);
  }
}
