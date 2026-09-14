import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly formMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.usernameError = page.locator('#username-error');
    this.passwordError = page.locator('#password-error');
    this.formMessage = page.locator('#form-message');
  }

  async open() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectSuccessMessage() {
    await expect(this.formMessage).toHaveText('Login successful');
  }

  async expectInvalidCredentialsMessage() {
    await expect(this.formMessage).toHaveText('Invalid username or password');
  }
}