import { test, expect } from './../../fixtures/PageObject';
import { ValidLoginData, InvalidLoginData } from "../../test-data/LoginData";

test.describe('SmartBear App Login Page functional verification @Login @Smoke', () => {
  test("SmartBear App Login Page successful login", async ({ loginPage }) => {
    await loginPage.login(ValidLoginData.username, ValidLoginData.password);
    await expect(loginPage.loginInfo).toBeVisible();
    await expect(loginPage.loginInfo).toContainText("Welcome, Tester!");
  });

  InvalidLoginData.forEach(user => {
    test(`SmartBear App Login Page invalid login with ${user.case}`, async({ loginPage }) => {
      await loginPage.login(user.username, user.password);
      await expect(loginPage.loginInfo).not.toBeVisible();
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText('Invalid Login or Password.');
    });
  });
});