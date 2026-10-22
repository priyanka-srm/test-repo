
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <section className="empty-state error-state" role="alert">
      <h2>Something went wrong</h2>
      <p>The application encountered an unexpected error.</p>

      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>

      {import.meta.env.DEV && (
        <details>
          <summary>Error details</summary>
          <pre>{error.message}</pre>
        </details>
      )}
    </section>
  );
}

export default function AppErrorBoundary({
  children,
  onReset,
  resetKeys,
}) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={onReset}
      resetKeys={resetKeys}
      onError={(error, info) => {
        if (import.meta.env.DEV) {
          console.error("Application render error:", error, info);
        }
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
