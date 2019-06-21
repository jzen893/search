import { newE2EPage } from '@stencil/core/testing';

describe('result-form-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<result-form-group></result-form-group>');

    const element = await page.find('result-form-group');
    expect(element).toHaveClass('hydrated');
  });

  it('displays label and input', async () => {
    const page = await newE2EPage();
    await page.setContent('<result-form-group></result-form-group>');

    await page.$eval('result-form-group', (elm: any) => {
      elm.label = 'test';
      elm.value = 'testValue';
    });
    await page.waitForChanges();

    const profileElement = await page.find('result-form-group');
    const labelElement = await profileElement.find('label');
    expect(labelElement.textContent).toContain('test');

    const inputElement = await profileElement.find('.form-control-plaintext');
    expect(inputElement).not.toBeNull();
  });

  it('display fieldset when object given for value', async () => {
    const page = await newE2EPage();
    await page.setContent('<result-form-group label="test"></result-form-group>');

    const profileElement = await page.find('result-form-group');
    (profileElement as any).setProperty('value', { dog : 'cat'});
    await page.waitForChanges();

    const labelElement = await profileElement.find('legend');
    expect(labelElement.textContent).toContain('test');

    const inputElement = await profileElement.find('input');
    expect(inputElement).not.toBeNull();
  });
});
