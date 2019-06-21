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
    const element = await profileElement.find('.card-header');
    expect(element.textContent).toContain('Welcome to Search!');
  });

  it('displays search results', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-results></app-results>');

    await page.$eval('app-results', (elm: any) => {
      elm.searchResults = [{dog: 'cat'}, {dog: 'dog'}];
    });
    await page.waitForChanges();

    const appResultsElement = await page.find('app-results');
    const element = await appResultsElement.find('h3');
    expect(element.textContent).toContain('2 results found');
  });

  it('displays no results found', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-results></app-results>');

    await page.$eval('app-results', (elm: any) => {
      elm.searchResults = [];
    });
    await page.waitForChanges();

    const appResultsElement = await page.find('app-results');
    const element = await appResultsElement.find('h3');
    expect(element.textContent).toContain('No results found!');
  });

});
