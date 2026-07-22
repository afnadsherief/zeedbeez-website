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

  test('CTA buttons remain visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.getByRole('link', { name: /discover products/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /the science/i })).toBeVisible()
  })

  test('serves the default share image', async ({ page }) => {
    const response = await page.goto('/opengraph-image')
    await expect(response?.headers()['content-type']).toContain('image/png')
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

  test('keeps keyboard focus inside the open mobile menu', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: /open menu/i }).click()

    const firstLink = page.getByRole('link', { name: 'Research', exact: true })
    const lastLink = page.getByRole('link', { name: 'Shop Now', exact: true })

    await firstLink.focus()
    await page.keyboard.press('Shift+Tab')
    await expect(lastLink).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(firstLink).toBeFocused()
  })
})
