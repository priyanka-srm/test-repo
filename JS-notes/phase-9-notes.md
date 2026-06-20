# Phase 9 — UI Engineering Concepts


# 9.1 Debouncing

## Question

What is Debouncing?

## Answer

Debouncing is a technique used to delay the execution of a function until the user stops performing an action for a specific amount of time.

Instead of running a function on every event, debounce waits for the activity to stop and then executes the function once.

---

## Why Debouncing is Required

### Question

Why do we use debouncing?

### Answer

Some events can trigger multiple times in a short period.

Examples:

- User typing in search box
- Window resizing
- Autosave operations

Running expensive operations for every event can reduce performance.

Debouncing helps reduce unnecessary function calls.

---

## Example

```js
function debounce(fn, delay) {

  let timer;

  return function(...args) {

    clearTimeout(timer);

    timer = setTimeout(() => {

      fn.apply(this, args);

    }, delay);

  };

}
```

---

## Behavior

- Stores the timer reference
- Clears the previous timer when a new event occurs
- Starts a new timer
- Executes the function only when the delay completes

---

## Usage

```js
const debouncedSearch =
debounce(searchMovies, 500);


searchInput.addEventListener(
  "input",
  debouncedSearch
);
```

---

## Execution Flow

```text
User types
      |
      |
Timer starts
      |
      |
User types again
      |
      |
Previous timer cancelled
      |
      |
New timer starts
      |
      |
User stops typing
      |
      |
Function executes
```

---

## Use Cases

- Search-as-you-type
- API search requests
- Autosave
- Form validation
- Window resize handling

---

## Benefits

- Reduces unnecessary API calls
- Improves performance
- Prevents excessive function execution
- Creates smoother user experience

---

## Conclusion

Debouncing improves application performance by executing a function only after the user stops an activity.


---


# 9.2 Throttling

## Question

What is Throttling?

## Answer

Throttling is a technique that limits how frequently a function can execute within a specific time interval.

It allows a function to run at controlled intervals during continuous events.

---

## Why Throttling is Required

### Question

Why do we use throttling?

### Answer

Some browser events fire continuously.

Examples:

- Scroll
- Mouse movement
- Window resize

Calling functions continuously can create performance issues.

Throttling limits the execution frequency.

---

## Example

```js
function throttle(fn, limit) {

  let lastCall = 0;

  return function(...args) {

    const now = Date.now();

    if(now - lastCall >= limit) {

      lastCall = now;

      fn.apply(this, args);

    }

  };

}
```

---

## Behavior

- Stores the last execution time
- Checks the time difference
- Executes only when the limit is completed
- Blocks unnecessary repeated calls

---

## Usage

```js
const handleScroll =
throttle(loadMore, 1000);


window.addEventListener(
  "scroll",
  handleScroll
);
```

---

## Execution Flow

```text
Continuous Event
        |
        |
Function executes
        |
        |
Wait for limit time
        |
        |
Allow next execution
```

---

## Use Cases

- Infinite scrolling
- Scroll events
- Mouse movement tracking
- Button click prevention
- Performance optimization

---

## Benefits

- Controls frequent events
- Prevents performance problems
- Reduces unnecessary calculations

---

## Conclusion

Throttling improves performance by controlling how often a function can run during continuous events.


---


# 9.3 Debounce vs Throttle

## Question

What is the difference between Debouncing and Throttling?

## Answer

Both are performance optimization techniques, but their execution behavior is different.

| Feature | Debounce | Throttle |
|----------|----------|----------|
| Execution | After activity stops | During continuous activity |
| Timing | Waits for inactivity | Runs at fixed intervals |
| Main Purpose | Reduce repeated calls | Limit execution frequency |
| Example | Search input | Scroll events |

---

## Example Comparison

### Debounce

User typing:

```text
b
ba
bat
batman
```

Function runs only after typing stops.

---

### Throttle

User scrolling:

```text
scroll
scroll
scroll
scroll
```

Function runs once every fixed interval.

---

## Interview Answer

Debouncing waits until the user stops performing an action before executing.

Throttling allows execution at controlled intervals while the action is still happening.


---


# 9.4 Implementing Custom Debounce and Throttle

## Question

Why should we implement debounce and throttle manually?

## Answer

Implementing them from scratch helps understand:

- Closures
- Timers
- Callback functions
- Event handling
- Performance optimization

These are common frontend interview concepts.

---

## Concepts Used

### Closures

A function remembers variables from its outer scope.

Example:

```js
let timer;
```

The returned function can still access this variable.

---

### setTimeout()

Used to delay execution.

---

### Date.now()

Used to track execution time for throttling.

---

## Real World Applications

- Search optimization
- API request control
- Infinite scrolling
- User interaction handling
- Better UI performance

---

# 9.5 UI Performance Optimization

## Question

Why are debounce and throttle considered UI engineering concepts?

## Answer

Modern applications handle many user interactions.

Without optimization:

- Too many API calls
- Slow UI response
- Poor performance

Debounce and throttle help applications respond efficiently.

---

## Examples

### Search

Without debounce:

```text
User types
API call
User types
API call
User types
API call
```

---

With debounce:

```text
User types
      |
Wait
      |
API call
```

---

### Scroll

Without throttle:

```text
Scroll event
Scroll event
Scroll event
```

---

With throttle:

```text
Scroll
   |
Execute
   |
Wait
   |
Execute again
```

---

# Concepts Practiced

- Debouncing
- Throttling
- setTimeout()
- clearTimeout()
- Date.now()
- Closures
- Event Optimization
- Performance Handling


---

# Key Takeaways

- Debouncing delays execution until activity stops.
- Throttling limits execution frequency during continuous events.
- Debounce is useful for search and autosave.
- Throttle is useful for scroll and mouse events.
- Both techniques improve frontend performance.
- These concepts are commonly used in production applications.


---

# Conclusion

Phase 9 focused on UI Engineering concepts that improve application performance and user experience.

Debouncing helps prevent unnecessary repeated operations by waiting for user inactivity, while throttling controls the execution rate during continuous events.

These techniques are essential for building fast, efficient, and responsive frontend applications.