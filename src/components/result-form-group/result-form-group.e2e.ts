import { newE2EPage } from '@stencil/core/testing';

describe('result-form-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<result-form-group></result-form-group>');

    const element = await page.find('result-form-group');
    expect(element).toHaveClass('hydrated');
  });

  it('displays specified label and value', async () => {
    const page = await newE2EPage();
    await page.setContent('<result-form-group label="test" value="testValue"></result-form-group>');

    const profileElement = await page.find('result-form-group');
    const labelElement = profileElement.querySelector('label');
    expect(labelElement.textContent).toContain('test');

    const inputElement = profileElement.querySelector('input');
    expect(inputElement.value).toContain('testValue');
  });
});
