import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'result-form-group',
})
export class ResultFormGroup {

  @Prop() label: string;

  @Prop() value: string;

  render() {
  if (typeof this.value === 'object' && !Array.isArray(this.value)) {
      return (<fieldset class="form-group ml-3 p-2">
        <legend>{this.label}</legend>
        {Object.keys(this.value).map((valueKey) =>
          <result-form-group label={valueKey} value={this.value[valueKey]} />
        )}
      </fieldset>);
    }

  return (<div class="form-group row">
        <label htmlfor={this.label} class="col-sm-2 col-form-label">{this.label}</label>
        <div class="col-sm-10">
          <input type="text" readonly class="form-control-plaintext" id={this.label} value={this.value} />
        </div>
      </div>);
  }
}
