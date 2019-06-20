import { Component, h, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'app-results',
  styleUrl: 'app-results.css',
  shadow: false
})
export class AppResults {

  @Prop() searchResults: any[];
  @Watch('searchResults')
  watchHandler() {
    this.hasSearched = true;
  }

  @State() hasSearched: boolean = false;

  render() {

    if (!this.hasSearched) {
      return (
        <div class="card">
          <div class="card-header">
            Welcome to Search!
          </div>
          <div class="card-body">
            <h5 class="card-title">Getting Started</h5>
            <p class="card-text">Pick a Category, Field, and enter your Search Value. Hit 'Search' button!</p>
          </div>
        </div>
      );
    }

    if (this.searchResults.length > 0) {
      return (<div class="mt-2">
        <h3>{this.searchResults.length} results found</h3> <ul class="list-group list-group-flush">
        {this.searchResults.map((result) =>
          <li key={result._id} class="list-group-item">
            <form>
              {Object.keys(result).map((resultKey) =>
                <result-form-group label={resultKey} value={result[resultKey]} />
              )}
            </form>
            </li>
        )}
      </ul></div>)
    }

      return (
        <div class="alert alert-primary" role="alert">
          <h3>No results found!</h3>
        </div>
      );

  }
}
