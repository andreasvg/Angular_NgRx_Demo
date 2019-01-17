# NgRx Demo

Demonstrates how to use NgRx for Redux style state management.

## Container/Presentation Component Pattern

Note how this is implemented, for instance in the ProductShell component (container) and ProductList component (presentation). The ProductList does not fetch any data, rather it gets all data passed into it via the input parameters. The ProductShell component subscribes to the NgRx store to get access to the relevant state.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

