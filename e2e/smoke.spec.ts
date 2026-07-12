import { test, expect } from '@playwright/test'

test.describe('Homepage smoke test', () => {
  test('loads successfully and shows hero content', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/ZeedBeez/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('has skip-to-content link for accessibility', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeAttached()
  })

  test('navigation is present and accessible', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('banner')
    await expect(nav).toBeVisible()
  })

  test('CTA buttons are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /discover products/i })).toBeVisible()
  })
})

test.describe('Mobile menu keyboard accessibility', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('Escape closes the mobile menu and returns focus to the toggle button', async ({ page }) => {
    await page.goto('/')

    const toggle = page.getByRole('button', { name: /open menu/i })
    await toggle.click()

    const mobileNav = page.getByRole('navigation', { name: /mobile navigation/i })
    await expect(mobileNav).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(mobileNav).not.toBeVisible()
    await expect(toggle).toBeFocused()
  })
})
