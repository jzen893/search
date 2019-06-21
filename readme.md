# Search

This is a simple app to allow searching 3 JSON files (tickets.json and users.json and organization.json),
returning results in a human readable format. 

When executing a search operation, where data exists, values from any 
related entities should be included in the results.

The search uses [Fuse.js](https://fusejs.io/), which means the search is 
fuzzy, but it also means there is no searching on boolean fields.

## Getting Started

Prerequisites: [Node.js](https://nodejs.org/en/) (>=10.0.0).

To get started, clone this repo to a new directory and run:

```bash
npm install
```

and then run:

```bash
npm start
```

This will launch the site in a browser at http://localhost:3333 with hot reloading enabled.

## Production Builds

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```
npm test
```
