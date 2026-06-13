import { test, expect } from '@playwright/test'

test.describe('Health Check', () => {
  test('should load the app and redirect to login', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/login')
    await expect(page).toHaveTitle(/Trading/)
  })

  test('should return 200 from BE /live endpoint', async ({ request }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    const response = await request.get(`${apiUrl}/live`)

    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty('status', 'ok')
  })

  test('should display login page without errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/login')
    await expect(page.locator('body')).toBeVisible()

    expect(errors).toHaveLength(0)
  })

  test('should load page within acceptable time', async ({ page }) => {
    const start = Date.now()
    await page.goto('/login')
    const duration = Date.now() - start

    await expect(page.locator('body')).toBeVisible()
    expect(duration).toBeLessThan(5000)
  })
})
