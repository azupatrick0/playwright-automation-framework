# Playwright Automation Framework

[![Test](https://github.com/azupatrick0/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/azupatrick0/playwright-automation-framework/actions/workflows/playwright.yml)

This repository contains a **Playwright + TypeScript automation framework**, covering full end-to-end flows with **positive and negative validations**, network/API assertions, and localization testing.

---

## **Features Tested**

1. Navigation
2. Demo request form
3. Company signup
4. Contractor signup
5. Login flow 
6. Forgot password flow
7. Localization / language switch

---

## **Project Structure**

```
playwright-automation-framework/
│
├── tests/ # All test specs
│   ├── navigation.spec.ts
│   ├── demo.spec.ts
│   ├── companySignup.spec.ts
│   ├── contractorSignup.spec.ts
│   ├── login.spec.ts
│   ├── forgotPassword.spec.ts
│   └── localization.spec.ts
│
├── pages/ # Page Objects with locators & methods
├── fixtures/ # Test data
├── utils/ # Helpers (API assertions)
├── playwright.config.ts # Framework config, browsers, retries, Allure report
├── Dockerfile # Containerized framework execution
├── .github/workflows/ # GitHub Actions CI workflow
├── allure-results/ # Generated Allure data (auto)
├── README.md
└── tsconfig.json
```


---

## **Setup & Run Locally**

```bash
# Clone repository
git clone <repository-url>

# Node version
nvm use 18

# Install dependencies
npm i

# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run in headed mode
npm run test:headed
```

---

## **Allure Reporting**

Allure is integrated for detailed, step-by-step reporting with screenshots and video attachments on failure.

## Run tests
```npm test```

## Generate and open test report
```npm run test:report```

## Features in the Allure report:

Step-level logs for positive & negative flows

Screenshots & videos on failures

## **Run with Docker**
Make sure you have Docker installed on your system and running

### Build Docker image
```npm run docker:build```

### Run tests inside Docker
```npm run docker:test```

## **CI/CD – GitHub Actions**

Workflow runs tests on Chromium

Retries enabled for flaky tests in CI

Generates and optionally uploads Allure report artifacts

Workflow file: .github/workflows/playwright.yml

## **Best Practices**

All locators follow getByTestId, getByRole, or semantic selectors

Page Object Model ensures maintainable and reusable code

Tests orchestrate flows using Page Object methods only

Negative validations are always included before happy paths

Dynamic test data ensures tests are idempotent and reliable

Screenshots/videos are automatically captured on failures