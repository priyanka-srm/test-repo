import { Suspense } from "react";
function PageLoading() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      <strong>Loading lab...</strong>
      <span>Fetching the route chunk.</span>
    </div>
  );
}
export default function LazyRoute({ children }) {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>;
}
