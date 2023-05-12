import { hydrateRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Router } from "./Router";
import { React } from "react";

hydrateRoot(document, <Root />);

function Root() {
  return (
    <ErrorBoundary FallbackComponent={ServerError}>
      <Router />
    </ErrorBoundary>
  );
}

function ServerError({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.stack}</pre>
    </div>
  );
}
