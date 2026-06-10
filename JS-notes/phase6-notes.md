# Phase 6 — Asynchronous JavaScript

---

# 6.1 Callbacks → Callback Hell

## Question

What is a Callback Function?

## Answer

```js
function fetchData(callback) {

  const data = "User Data";

  callback(data);

}

fetchData((data) => {

  console.log(data);

});
```

## Behavior

- A callback is a function passed as an argument to another function.
- It executes after a task is completed.
- Commonly used for asynchronous operations.
- Helps delay execution until data becomes available.

---

## Callback Hell

### Question

What is Callback Hell?

### Answer

```js
getData(function(a) {

  getMore(a, function(b) {

    getMore(b, function(c) {

      console.log(c);

    });

  });

});
```

### Behavior

- Multiple nested callbacks create deeply indented code.
- Harder to read and maintain.
- Difficult to debug and scale.
- Commonly called the Pyramid of Doom.
- Promises were introduced to solve this problem.

---

# 6.2 Promises

## Question

What is a Promise?

## Answer

```js
const promise = new Promise(

  (resolve, reject) => {

    const success = true;

    if (success) {

      resolve("Data Loaded");

    }

    else {

      reject("Something Went Wrong");

    }

  }

);
```

## Behavior

- A Promise represents a future result.
- Used to handle asynchronous operations.
- Avoids callback hell.
- Can either succeed or fail.

---

## Promise States

### Question

What are the states of a Promise?

### Answer

```text
Pending
   ↓
Fulfilled
   OR
Rejected
```

### Behavior

- Pending → Initial state.
- Fulfilled → Operation completed successfully.
- Rejected → Operation failed.
- A Promise can settle only once.

---

## Consuming a Promise

### Question

How to handle Promise results?

### Answer

```js
promise

  .then((data) => {

    console.log(data);

  })

  .catch((error) => {

    console.error(error);

  })

  .finally(() => {

    console.log("Done");

  });
```

### Behavior

- then() handles success.
- catch() handles errors.
- finally() executes regardless of result.
- Improves asynchronous code readability.

---

## Promise.all()

### Question

How to wait for multiple promises?

### Answer

```js
Promise.all([

  p1,
  p2,
  p3

])

.then((results) => {

  console.log(results);

});
```

### Behavior

- Waits until all promises succeed.
- Returns all results together.
- Fails immediately if one promise rejects.
- Known as Fail Fast behavior.

---

## Promise.allSettled()

### Question

How to wait for all promises regardless of failure?

### Answer

```js
Promise.allSettled([

  p1,
  p2,
  p3

])

.then((results) => {

  console.log(results);

});
```

### Behavior

- Waits for every promise to complete.
- Success and failure results are both returned.
- Useful when all results are required.

---

## Promise.race()

### Question

What is Promise.race()?

### Answer

```js
Promise.race([

  p1,
  p2,
  p3

])

.then((result) => {

  console.log(result);

});
```

### Behavior

- Returns the first settled promise.
- Success or failure can win the race.
- Useful for implementing timeouts.

---

## Promise.any()

### Question

What is Promise.any()?

### Answer

```js
Promise.any([

  p1,
  p2,
  p3

])

.then((result) => {

  console.log(result);

});
```

### Behavior

- Returns the first fulfilled promise.
- Ignores rejected promises.
- Fails only if all promises reject.

---

# 6.3 Async / Await

## Question

What is async?

## Answer

```js
async function greet() {

  return "Hello";

}
```

### Behavior

- async makes a function asynchronous.
- Always returns a Promise.
- Simplifies Promise-based code.

---

## await

### Question

What is await?

### Answer

```js
async function getData() {

  const response = await fetch(url);

  console.log(response);

}
```

### Behavior

- Pauses execution until Promise resolves.
- Can only be used inside async functions.
- Makes asynchronous code appear synchronous.

---

## Async Await with Error Handling

### Question

How to handle errors with async/await?

### Answer

```js
async function fetchMovies() {

  try {

    const response = await fetch(url);

    const data = await response.json();

    return data;

  }

  catch(error) {

    console.error(error);

  }

}
```

### Behavior

- try block executes async code.
- catch block handles failures.
- Prevents application crashes.
- Recommended for production applications.

---

# 6.4 Event Loop

## Question

What is the JavaScript Event Loop?

## Answer

```text
Call Stack
     ↓
Web APIs
     ↓
Task Queues
     ↓
Event Loop
     ↓
Call Stack
```

### Behavior

- JavaScript is single-threaded.
- Event Loop manages asynchronous execution.
- Moves completed tasks back to the Call Stack.
- Enables non-blocking behavior.

---

## Call Stack

### Question

What is the Call Stack?

### Answer

```js
function first() {

  second();

}

function second() {

  console.log("Hello");

}

first();
```

### Behavior

- Stores currently executing functions.
- Uses Last In First Out (LIFO).
- Functions are pushed and popped during execution.

---

## Microtask Queue

### Question

What runs in the Microtask Queue?

### Answer

```js
Promise.resolve()

  .then(() => {

    console.log("Microtask");

  });
```

### Behavior

- Stores Promise callbacks.
- Higher priority than macrotasks.
- Executes immediately after synchronous code.

---

## Macrotask Queue

### Question

What runs in the Macrotask Queue?

### Answer

```js
setTimeout(() => {

  console.log("Macrotask");

}, 0);
```

### Behavior

- Stores timer callbacks.
- Lower priority than microtasks.
- Executes after microtasks finish.

---

## Event Loop Execution Order

### Question

Predict the output.

### Answer

```js
console.log("1");

setTimeout(() => {

  console.log("2");

}, 0);

Promise.resolve()

  .then(() => {

    console.log("3");

  });

console.log("4");
```

### Output

```text
1
4
3
2
```

### Behavior

- Synchronous code executes first.
- Microtasks execute next.
- Macrotasks execute last.
- Event Loop controls execution order.

---

# 6.5 Error Handling Patterns

## try / catch Pattern

### Question

How to handle asynchronous errors?

### Answer

```js
async function loadData() {

  try {

    const data =
    await fetch(url);

    return data;

  }

  catch(error) {

    console.error(error);

  }

}
```

### Behavior

- Handles runtime failures safely.
- Prevents application crashes.
- Recommended for async/await.

---

## Error Propagation

### Question

How to rethrow errors?

### Answer

```js
async function getUser() {

  const user =
  await fetchData();

  if (!user) {

    throw new Error(
      "User Not Found"
    );

  }

  return user;

}
```

### Behavior

- Allows higher-level functions to handle errors.
- Improves application architecture.
- Keeps responsibilities separated.

---

## Fallback Values

### Question

How to provide fallback data?

### Answer

```js
const data =

await fetchData()

.catch(() => {

  return [];

});
```

### Behavior

- Prevents application failure.
- Provides safe default values.
- Improves user experience.

---

# 6.6 Fetch API Deep Dive

## Basic Fetch Request

### Question

How to fetch data from an API?

### Answer

```js
fetch(url)

  .then((response) => {

    return response.json();

  })

  .then((data) => {

    console.log(data);

  });
```

### Behavior

- Sends HTTP request.
- Returns a Promise.
- Converts JSON response into JavaScript objects.

---

## Fetch with async/await

### Question

How to fetch data using async/await?

### Answer

```js
async function loadData() {

  const response =
  await fetch(url);

  const data =
  await response.json();

  console.log(data);

}
```

### Behavior

- Cleaner syntax than chained Promises.
- Easier to read and maintain.
- Preferred in modern applications.

---

## Checking Response Status

### Question

Why check response.ok?

### Answer

```js
const response =
await fetch(url);

if (!response.ok) {

  throw new Error(

    `HTTP ${response.status}`

  );

}
```

### Behavior

- fetch does not reject for 404 or 500 errors.
- response.ok verifies success.
- Prevents silent failures.

---

## POST Request

### Question

How to create data?

### Answer

```js
fetch(url, {

  method: "POST",

  headers: {

    "Content-Type":
    "application/json"

  },

  body: JSON.stringify(data)

});
```

### Behavior

- Creates new resources.
- Sends JSON data to the server.
- Commonly used in forms.

---

## PUT Request

### Question

How to update data?

### Answer

```js
fetch(`${url}/${id}`, {

  method: "PUT",

  headers: {

    "Content-Type":
    "application/json"

  },

  body: JSON.stringify(
    updates
  )

});
```

### Behavior

- Updates existing resources.
- Sends modified data to the server.
- Commonly used in CRUD applications.

---

## DELETE Request

### Question

How to delete data?

### Answer

```js
fetch(`${url}/${id}`, {

  method: "DELETE"

});
```

### Behavior

- Removes existing resources.
- Commonly used in CRUD operations.
- No request body is usually required.

---

# 6.7 API Design Thinking

## Query Parameters

### Question

What are Query Parameters?

### Answer

```text
/search?query=batman
```

### Behavior

- Used to filter data.
- Sent through the URL.
- Common in search functionality.

---

## URL Encoding

### Question

Why encode URLs?

### Answer

```js
encodeURIComponent(

  "Spider Man"

);
```

### Output

```text
Spider%20Man
```

### Behavior

- Converts special characters.
- Produces valid URLs.
- Prevents request errors.

---

## Pagination

### Question

What is Pagination?

### Answer

```text
?page=2&limit=10
```

### Behavior

- Loads data in smaller chunks.
- Improves performance.
- Reduces server load.

---

## API Documentation

### Question

Why read API documentation first?

### Answer

```text
Read Documentation
        ↓
Understand Endpoints
        ↓
Send Requests
        ↓
Handle Responses
```

### Behavior

- Explains available endpoints.
- Shows required parameters.
- Defines response structures.
- Prevents implementation mistakes.

---

# Concepts Learned

- Callback Functions
- Callback Hell
- Promises
- Promise States
- then()
- catch()
- finally()
- Promise.all()
- Promise.allSettled()
- Promise.race()
- Promise.any()
- async
- await
- Event Loop
- Call Stack
- Web APIs
- Microtask Queue
- Macrotask Queue
- Error Handling
- Error Propagation
- Fallback Values
- Fetch API
- HTTP Requests
- GET Requests
- POST Requests
- PUT Requests
- DELETE Requests
- Query Parameters
- URL Encoding
- Pagination
- API Documentation

---

# Conclusion

Phase 6 focused on asynchronous JavaScript and API communication.

This phase introduced Callbacks, Callback Hell, Promises, async/await, Event Loop, Error Handling, Fetch API, HTTP Requests, and API Design concepts.

These concepts are widely used in modern JavaScript applications, REST APIs, frontend frameworks, real-world web applications, and frontend interviews.