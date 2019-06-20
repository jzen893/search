import {Component, h, Listen, State} from '@stencil/core';
import search from "../../global/search";


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {

  @State() searchResults: any[] = [];

  @Listen('searchCompleted')
  searchCompletedHandler(event: CustomEvent) {
    console.log('Received the custom searchCompleted event: ', event.detail);
    this.searchResults = [...event.detail];
  }

  componentWillLoad() {
    return search.loadData();
  }

  render() {
    return (
      <div class="vh-100">
        <header>
          <h1>Search</h1>
        </header>

        <main class="container">
          <div class="row h-100">
            <div class="col-sm-3">
              <app-search/>
            </div>
            <div class="col-sm-9 h-100 pt-2 overflow-auto">
              <app-results searchResults={this.searchResults} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
