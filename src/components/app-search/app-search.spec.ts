import { AppSearch } from './app-search';

describe('app-search', () => {
  it('builds', () => {
    expect(new AppSearch()).toBeTruthy();
  });

  describe('handleFieldSelect', () => {
    it('sets value of field', () => {
      const component = new AppSearch();
      component.handleFieldSelect({target: { value: 'test' } });
      expect(component.field).toEqual('test');
    });
  });
});
