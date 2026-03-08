import { Page, expect } from '@playwright/test';

export async function expectApiResponse(page: Page, urlPart: string, status: number = 200) {
  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes(urlPart) && resp.status() === status)
  ]);
  expect(response.ok()).toBeTruthy();
}