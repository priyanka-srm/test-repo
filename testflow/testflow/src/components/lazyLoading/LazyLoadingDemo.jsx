import { lazy, Suspense } from "react";

const LazyProfile = lazy(() => import("./LazyProfile"));

function LazyLoadingDemo() {
  return (
    <div>
      <h1>Code Splitting Demo</h1>

      <Suspense fallback={<p>Loading profile...</p>}>
        <LazyProfile />
      </Suspense>
    </div>
  );
}

export default LazyLoadingDemo;
