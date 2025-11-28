import { test as base, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';

type PageObject = {
  basePage: BasePage,
  loginPage: LoginPage
}

export const test = base.extend<PageObject>({
  basePage: async({ page }, use) => {
    const basePage = new BasePage(page);
    // actions
    await use(basePage);
  },

  loginPage: async({ page }, use) =>{
    await page.goto('');
    const loginPage = new LoginPage(page);

    await use(loginPage);
  }
});

export { expect };