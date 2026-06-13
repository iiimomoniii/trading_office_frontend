import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()

    await expect(page).toHaveTitle(/Trading/)
    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.signInButton).toBeVisible()
  })

  test('should show validation errors when submitting empty form', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()

    await loginPage.signInButton.click()

    await expect(page.getByText('Please enter username')).toBeVisible()
    await expect(page.getByText('Please enter password')).toBeVisible()
  })

  test('should redirect to dashboard after login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()

    await loginPage.login('admin', 'password')

    await expect(page).toHaveURL('/dashboard')
  })

  test('should redirect to login from root', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/login')
  })
})
