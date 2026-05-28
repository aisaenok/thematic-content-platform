import { expect, test } from '@playwright/test'

test.describe('public routes', () => {
  test('home page is available', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { name: 'Thematic Content Platform' }),
    ).toBeVisible()

    const mainNavigation = page.getByRole('navigation', {
      name: 'Main navigation',
    })

    await expect(
      mainNavigation.getByRole('link', { name: 'Wiki', exact: true }),
    ).toBeVisible()

    await expect(
      mainNavigation.getByRole('link', { name: 'News', exact: true }),
    ).toBeVisible()

    await expect(
      mainNavigation.getByRole('link', { name: 'Search', exact: true }),
    ).toBeVisible()
  })

  test('wiki list page is available', async ({ page }) => {
    await page.goto('/wiki')

    await expect(
      page.getByRole('heading', { name: 'Wiki articles' }),
    ).toBeVisible()

    await expect(
      page.getByRole('link', { name: 'Жизненный цикл ксеноморфа' }),
    ).toBeVisible()
  })

  test('wiki article details page is available', async ({ page }) => {
    await page.goto('/wiki/xenomorph-life-cycle')

    await expect(
      page.getByRole('heading', { name: 'Жизненный цикл ксеноморфа' }),
    ).toBeVisible()

    await expect(
      page.getByRole('heading', { name: 'Related content' }),
    ).toBeVisible()
  })

  test('wiki category page is available', async ({ page }) => {
    await page.goto('/wiki/categories/xenomorphs')

    await expect(
      page.getByRole('heading', { name: 'Xenomorphs' }),
    ).toBeVisible()
  })

  test('wiki tag page is available', async ({ page }) => {
    await page.goto('/wiki/tags/xenomorph')

    await expect(
      page.getByRole('heading', { name: 'Xenomorph' }),
    ).toBeVisible()
  })

  test('news list page is available', async ({ page }) => {
    await page.goto('/news')

    await expect(page.getByRole('heading', { name: 'News' })).toBeVisible()

    await expect(
      page.getByRole('link', {
        name: 'Platform notes: second content type enabled',
      }),
    ).toBeVisible()
  })

  test('news details page is available', async ({ page }) => {
    await page.goto('/news/demo-platform-notes')

    await expect(
      page.getByRole('heading', {
        name: 'Platform notes: second content type enabled',
      }),
    ).toBeVisible()
  })

  test('search page returns results by query', async ({ page }) => {
    await page.goto('/search?q=xenomorph')

    await expect(
      page.getByRole('heading', { name: 'Search content' }),
    ).toBeVisible()

    await expect(page.getByText(/Found \d+ result/)).toBeVisible()

    await expect(
      page.getByRole('link', { name: 'Жизненный цикл ксеноморфа' }),
    ).toBeVisible()
  })

  test('sitemap is available', async ({ page }) => {
    await page.goto('/sitemap.xml')

    await expect(page.locator('body')).toContainText('/wiki/xenomorph-life-cycle')
    await expect(page.locator('body')).toContainText('/news/demo-platform-notes')
  })

  test('rss feed is available', async ({ page }) => {
    await page.goto('/rss.xml')

    await expect(page.locator('body')).toContainText('Thematic Content Platform')
    await expect(page.locator('body')).toContainText('Platform notes')
  })
})