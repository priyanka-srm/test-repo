# RenderLab

RenderLab is a React performance laboratory built to understand, demonstrate, and observe practical React rendering and performance optimization techniques.

Instead of optimizing blindly, this project provides small interactive experiments where rendering behavior, memoization, code splitting, virtualization, and profiling concepts can be observed directly in the browser.

---

## Features

- React Router based multi-page performance laboratory
- Lazy-loaded performance experiment routes
- React.memo render optimization demonstration
- useMemo reference and calculation caching
- useCallback function reference stabilization
- React.lazy + Suspense code splitting
- react-window virtualization with 5,000 rows
- React DevTools Profiler workflow guide
- Render counters for observing component renders
- Interactive performance experiments
- Responsive UI
- Accessible buttons, labels, and semantic structure
- Development StrictMode behavior explained

---

## Performance Model

RenderLab follows a simple performance investigation model:

    Render
       ↓
    Compare
       ↓
    Commit
       ↓
    Measure
       ↓
    Optimize selectively

The project encourages profiling and understanding the actual rendering behavior before applying memoization or other performance optimizations.

---

## Architecture

The application uses `main.jsx` as the real entry point.

    main.jsx
       │
       └── RouterProvider
              │
              └── router
                     │
                     ├── /
                     │    └── HomePage
                     │
                     ├── /rerender
                     │    └── RenderPage
                     │
                     ├── /memo
                     │    └── MemoPage
                     │
                     ├── /callback
                     │    └── CallbackPage
                     │
                     ├── /lazy
                     │    └── LazyPage
                     │
                     ├── /virtualization
                     │    └── VirtualizationPage
                     │
                     └── /profiler
                          └── ProfilerPage

The performance lab routes are lazy-loaded so their JavaScript is loaded when the corresponding route is requested.

The `/lazy` experiment also demonstrates an independently lazy-loaded heavy chart component.

---

## Project Structure

    renderlab/
    │
    ├── public/
    │
    ├── src/
    │   │
    │   ├── components/
    │   │   ├── DemoCard.jsx
    │   │   ├── RenderCount.jsx
    │   │   └── SectionHeader.jsx
    │   │
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── RenderPage.jsx
    │   │   ├── MemoPage.jsx
    │   │   ├── CallbackPage.jsx
    │   │   ├── LazyPage.jsx
    │   │   ├── VirtualizationPage.jsx
    │   │   └── ProfilerPage.jsx
    │   │
    │   ├── router/
    │   │   └── router.jsx
    │   │
    │   ├── App.css
    │   ├── main.jsx
    │   └── ...
    │
    ├── package.json
    ├── vite.config.js
    └── README.md

`main.jsx` is the application entry point. The unused `App.jsx` file was removed so the documented architecture matches the real boot sequence.

---

# Performance Labs

## 01 — Re-render Behavior

Route:

    /rerender

This experiment demonstrates the difference between a re-render and a remount.

### Normal Child

A normal child receives a primitive prop and re-renders when its parent updates.

### React.memo Child

The memoized child receives the same primitive prop.

When the parent updates without changing the child's props, `React.memo` allows React to skip the child render.

### Stateful Memo Child

A memoized component can still re-render because of its own local state.

This demonstrates that:

    React.memo
        ≠
    component can never render again

It controls certain parent-driven renders when props remain equal.

### Render Counter

The experiment uses `useRef` to track render executions so the difference between normal and memoized rendering can be observed directly.

Development StrictMode can cause rendering logic to run more than once during development.

---

## 02 — React.memo and Reference Equality

Route:

    /memo

This experiment demonstrates why object references matter when using `React.memo`.

The page uses a memoized profile component:

    const MemoizedProfile = memo(function MemoizedProfile({ profile }) {
      // ...
    });

A stable profile object is created using `useMemo`:

    const stableProfile = useMemo(
      () => ({
        name: "RenderLab",
        role: "Performance experiment",
      }),
      []
    );

### Stable Reference

When the parent updates, the memoized child can skip rendering because the object reference remains unchanged.

    Parent update
         ↓
    same profile reference
         ↓
    React.memo
         ↓
    child can skip render

### Broken Reference

The page also provides a toggle that creates a new object.

Even though the values look identical:

    {
      name: "RenderLab",
      role: "Performance experiment"
    }

the object is a new reference.

Therefore:

    New object reference
            ↓
    React.memo detects changed prop
            ↓
    Child renders again

### Expensive Calculation

The page also demonstrates `useMemo` with an intentionally expensive calculation.

The calculation is cached until its dependencies change.

The experiment also explains that `useMemo` should not automatically be added everywhere.

---

## 03 — useCallback and Function References

Route:

    /callback

This experiment demonstrates how function references affect `React.memo`.

The page compares two modes:

    useCallback
    Inline function

### useCallback Mode

The callback is created with:

    const stableCallback = useCallback(() => {
      setCallbackRuns((current) => current + 1);
    }, []);

Because the dependency array is empty, React can return the same function reference between renders.

The memoized child can therefore skip parent-driven renders when the function reference remains unchanged.

### Inline Function Mode

The page also creates a function directly during rendering:

    const inlineCallback = () => {
      setCallbackRuns((current) => current + 1);
    };

A new function reference is created when the parent renders.

Therefore:

    Parent render
         ↓
    new function reference
         ↓
    React.memo sees changed prop
         ↓
    child renders again

### Important Detail

`useCallback` does not mean JavaScript stops creating a function expression during rendering.

Its main benefit in this experiment is that React can return a stable cached function reference when dependencies remain unchanged.

---

## 04 — Code Splitting

Route:

    /lazy

This experiment demonstrates loading JavaScript when it is needed.

The route itself is lazy-loaded.

The heavy chart component inside the page is also loaded on demand.

The implementation uses `lazy()` together with `Suspense`.

Conceptually:

    Initial application
           ↓
    Lazy route requested
           ↓
    Route chunk loaded
           ↓
    Lazy page rendered
           ↓
    Heavy chart requested
           ↓
    Additional chunk loaded

### Network Verification

The page provides instructions to verify the optimization using:

    DevTools
       ↓
    Network
       ↓
    JavaScript chunks

The goal is to confirm that the split chunk is actually requested rather than assuming that code splitting worked.

---

## 05 — Virtualization

Route:

    /virtualization

This experiment compares normal list rendering with virtualization.

The dataset contains:

    5,000 rows

### Normal Rendering

A normal `.map()` implementation creates DOM elements for the rendered list.

For thousands of items, this can result in a large number of DOM nodes.

### Virtualized Rendering

The project uses `react-window` with its modern `List` API.

The virtualized list renders only the rows required around the current viewport instead of mounting all 5,000 rows at once.

Configuration used by the experiment:

    Dataset: 5,000 rows
    Virtual row height: 64px
    Strategy: Windowed / Virtualized

Conceptually:

    5,000 total rows
           ↓
       Viewport
           ↓
    Only visible / nearby rows rendered

The page also provides a normal-vs-virtualized comparison so the DOM can be inspected in DevTools.

---

## 06 — React DevTools Profiler

Route:

    /profiler

This page explains how to use React DevTools Profiler to investigate performance problems.

### Investigation Workflow

    1. Open React DevTools
            ↓
    2. Open Profiler
            ↓
    3. Start recording
            ↓
    4. Interact with the application
            ↓
    5. Stop recording
            ↓
    6. Inspect commits and rendered components
            ↓
    7. Identify the cause
            ↓
    8. Optimize selectively

### Investigation Checklist

Before applying an optimization, ask:

- Is the interaction actually slow?
- Which component rendered unnecessarily?
- Did a prop reference change?
- Is the calculation genuinely expensive?
- Does the optimization reduce measurable work?

The project intentionally promotes:

    Profile first.
    Optimize second.

---

# React StrictMode Note

The project runs in development with React StrictMode.

StrictMode can intentionally invoke rendering logic more than once during development to help identify unsafe patterns.

Therefore, development render counters and console logs should not be treated as production performance measurements.

For accurate performance measurements:

    Use a production build
            +
    React DevTools Profiler

instead of relying only on development console counts.

---

# Technologies Used

- React
- React Router
- Vite
- JavaScript
- CSS
- React.memo
- useMemo
- useCallback
- useRef
- React.lazy
- Suspense
- React DevTools Profiler
- react-window

---

# Key React Concepts Demonstrated

## React.memo

Prevents certain parent-driven renders when props are unchanged according to React's comparison behavior.

    const MemoizedComponent = memo(Component);

---

## useMemo

Caches a calculated value or object reference until dependencies change.

    const value = useMemo(() => calculateValue(), [dependency]);

---

## useCallback

Caches a function reference until dependencies change.

    const callback = useCallback(() => {
      // ...
    }, [dependency]);

---

## React.lazy

Loads a component module dynamically.

    const Page = lazy(() => import("./Page"));

---

## Suspense

Provides a controlled fallback while lazy content is loading.

    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>

---

## Virtualization

Renders only the portion of a large dataset needed by the current viewport.

This reduces the number of simultaneously mounted DOM rows.

---

# Performance Decision Guide

RenderLab follows this basic decision process:

    Is there a real performance problem?
                 │
                 ├── No
                 │    └── Don't optimize unnecessarily
                 │
                 └── Yes
                      │
                      ├── Expensive calculation?
                      │       └── Consider useMemo
                      │
                      ├── Expensive child rendering?
                      │       └── Consider React.memo
                      │
                      ├── Function prop causing renders?
                      │       └── Consider useCallback
                      │
                      ├── Large list?
                      │       └── Consider virtualization
                      │
                      └── Large application bundle?
                              └── Consider code splitting

These are optimization tools, not automatic requirements.

The correct approach is to measure the actual problem first.

---

# Running the Project

Install dependencies:

    npm install

Start the development server:

    npm run dev

Build for production:

    npm run build

Preview the production build:

    npm run preview

---

# Routes

| Route | Experiment |
|---|---|
| `/` | Performance overview |
| `/rerender` | Re-render vs remount |
| `/memo` | React.memo + object reference equality |
| `/callback` | useCallback + function references |
| `/lazy` | React.lazy + Suspense + code splitting |
| `/virtualization` | 5,000-row virtualization |
| `/profiler` | React DevTools Profiler workflow |

---

# What I Learned

Through RenderLab, the main performance concepts demonstrated are:

- A re-render is different from a remount.
- React.memo can skip parent-driven renders when props remain equal.
- Object and function references affect memoization.
- useMemo can stabilize object references and cache expensive calculations.
- useCallback can stabilize function references.
- Memoization should be used intentionally rather than everywhere.
- React.lazy and Suspense can split application code into separately loaded chunks.
- Large lists can benefit from virtualization.
- React DevTools Profiler helps identify actual rendering work.
- Development StrictMode can affect observed render counts.
- Performance optimization should be based on measurement rather than assumptions.

---

# Project Philosophy

> Don't optimize code that isn't a problem.

The goal of RenderLab is not to demonstrate that every React application needs memoization.

The goal is to understand:

    What rendered?
    Why did it render?
    How much work did it do?
    Can the work be reduced?
    Did the optimization actually help?

That mindset is more important than memorizing individual optimization APIs.

---

# Status

Phase 14 — Performance Optimization

    Re-render behavior       ✅
    React.memo               ✅
    useMemo                  ✅
    useCallback               ✅
    Code splitting            ✅
    Virtualization            ✅
    Profiler workflow         ✅
    Architecture cleanup      ✅

RenderLab is complete as a practical React performance laboratory.