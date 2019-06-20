import { Component, Event, EventEmitter, State, h } from '@stencil/core';
import search, { Category } from '../../global/search';

@Component({
  tag: 'app-search',
  styleUrl: 'app-search.css',
  shadow: false
})
export class AppSearch {

  @Event() searchCompleted: EventEmitter;

  @State() category: Category;

  @State() fields: string[] = [];

  @State() field: string;

  @State() error = false;

  textInput: HTMLInputElement;

  handleCategorySelect(event) {
    this.category = event.target.value;
    this.fields = [...search.getFieldsForCategory(this.category)];
  }

  handleFieldSelect(event) {
    this.field = event.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.category || !this.field) {
      this.error = true;
      return;
    }
    this.error = false;
    let results = search.search(this.category, this.field, this.textInput.value);
    results = search.addRelatedData(results);
    this.searchCompleted.emit(results);
  }

  render() {
      return (
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div class="form-group">
            <label htmlFor="category">Category:</label>
            <select class="form-control" id="category" onInput={(event) => this.handleCategorySelect(event)} required>
              <option value="">Select one</option>
              <option value={Category.tickets}>Tickets</option>
              <option value={Category.organizations}>Organization</option>
              <option value={Category.users}>Users</option>
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="fields">Field:</label>
            <select class="form-control" id="fields" onInput={(event) => this.handleFieldSelect(event)} required>
              <option value="">Select one</option>
              {this.fields.map((field) =>
                <option value={field}>{field}</option>
              )}
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="search">Search Value:</label>
            <input type="text" class="form-control" id="search" ref={(el) => this.textInput = el as HTMLInputElement} />
            {this.error
              ? <small id="searchHelpBlock" class="form-text text-muted">
                Please select a Category and Field before searching!
              </small>
              : <span/>
            }

          </div>
          <button type="submit" class="btn btn-primary mb-2">Search</button>
        </form>
      );
  }
}
