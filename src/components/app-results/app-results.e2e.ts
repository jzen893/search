import { newE2EPage } from '@stencil/core/testing';

describe('app-results', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-results></app-results>');

    const element = await page.find('app-results');
    expect(element).toHaveClass('hydrated');
  });

  it('displays welcome screen on first load', async () => {
    const page = await newE2EPage({ url: '/' });

    const profileElement = await page.find('app-results');
    const element = profileElement.querySelector('.card-header');
    expect(element.textContent).toContain('Welcome to Search!');
  });
});
