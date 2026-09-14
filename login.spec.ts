import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login validation', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('valid credentials should display a success message', async () => {
    await loginPage.login('demo.user', 'Pass123!');
    await loginPage.expectSuccessMessage();
  });

  test('invalid password should display an error message', async () => {
    await loginPage.login('demo.user', 'wrong-password');
    await loginPage.expectInvalidCredentialsMessage();
  });

  test('empty username should display a required-field message', async () => {
    await loginPage.login('', 'Pass123!');
    await expect(loginPage.usernameError).toHaveText('Username is required');
    await expect(loginPage.formMessage).toHaveText('');
  });

  test('empty password should display a required-field message', async () => {
    await loginPage.login('demo.user', '');
    await expect(loginPage.passwordError).toHaveText('Password is required');
    await expect(loginPage.formMessage).toHaveText('');
  });

  test('empty username and password should display both validation messages', async () => {
    await loginPage.login('', '');
    await expect(loginPage.usernameError).toHaveText('Username is required');
    await expect(loginPage.passwordError).toHaveText('Password is required');
  });

  test('password input should mask the entered value', async () => {
    await loginPage.passwordInput.fill('secret-value');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });
});