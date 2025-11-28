# SmartBear App Playwright Project

This repository contains an end-to-end test automation framework for the **SmartBear App**, built with **[Microsoft Playwright](https://playwright.dev/)**.  
It follows industry best practices such as the **Page Object Model (POM)**, reusable fixtures, test data separation, and CI/CD pipeline integration.

---

## 📌 Features
- ✅ Page Object Model (POM) for maintainability.  
- 📂 Organized test structure (E2E tests, Login tests, Visual tests).  
- 🔄 Reusable fixtures and utilities.  
- 🗂️ Centralized test data.  
- 📊 Playwright HTML reports, traces, and screenshots.  
- 🔗 GitHub Actions CI pipeline integration.  

---

## 📁 Project Structure

```
smartbear-app-playwright-project/
│── .github/workflows/      # GitHub Actions CI/CD workflows
│── fixtures/               # Custom test fixtures
│── pages/                  # Page Object Model classes
│   ├── BasePage.ts
│   └── LoginPage.ts
│── test-data/              # Test data files
│   └── LoginData.ts
│── tests/                  # Test suites
│   ├── e2e-tests/
│   │   └── home-tests.spec.ts
│   ├── login-tests/
│   │   ├── login-functional.spec.ts
│   │   ├── login-visual.spec.ts
│   │   └── login-visual.spec.ts-snapshots/
│   └── setup/
│       ├── globalSetup.ts
│       └── login.spec.ts
│── utils/                  # Utility helpers
│   └── ScreenshotUtils.ts
│── playwright.config.ts    # Playwright configuration
│── package.json            # Project dependencies
```

---


## ▶️ Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode:
```bash
npx playwright test --headed
```

Run only login tests:
```bash
npx playwright test tests/login-tests
```

Run tests with report:
```bash
npx playwright test --reporter=html
npx playwright show-report
```

---

## 🏗️ Page Object Model (POM) Example

**`pages/LoginPage.ts`**
```ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://smartbear-app-url/login');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
```

---

## 🧪 Example Test

**`tests/login-tests/login-functional.spec.ts`**
```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../test-data/LoginData';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(loginData.validUser.username, loginData.validUser.password);

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h1')).toHaveText(`Welcome, ${loginData.validUser.username}`);
});
```

---

## 📊 Reports & Debugging

Generate HTML report:
```bash
npx playwright show-report
```

Enable tracing:
```bash
npx playwright test --trace on
```

Take screenshot:
```ts
await page.screenshot({ path: 'screenshot.png' });
```

---

## 🔗 CI/CD Integration

This project uses **GitHub Actions** for CI. The workflow is defined in:
```
.github/workflows/
```

It runs Playwright tests automatically on each push and pull request.

---

## 📖 Resources
- [Playwright Docs](https://playwright.dev/docs/intro)  
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)  

---
