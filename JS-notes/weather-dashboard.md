# Phase 6 — Weather Dashboard

---

# Project Overview

The Weather Dashboard is a frontend application built using Asynchronous JavaScript concepts.

The application allows users to search weather information for any city and displays:

- Current Weather
- Temperature
- Humidity
- Wind Speed
- Weather Condition
- Loading State
- Error State

The project demonstrates real-world API integration using Fetch API, Promises, Async/Await, and Error Handling.

---

# Features

✅ Search Weather By City

✅ Fetch Data From Weather API

✅ Async/Await Implementation

✅ Promise-Based API Requests

✅ Loading State Handling

✅ Error State Handling

✅ Empty State Handling

✅ Responsive Design

✅ Dark Mode Support

---

# Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- OpenWeather API
- Local Storage API

---

# Project Structure

```text
weather-dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# Phase 6 Concepts Used

# 1. Callback Pattern

## Example

```js
function getData(callback) {

  setTimeout(() => {

    callback("Data Loaded");

  }, 1000);

}

getData((data) => {

  console.log(data);

});
```

## Behavior

- A function is passed as an argument.
- Callback executes after asynchronous work completes.
- Early JavaScript async operations relied heavily on callbacks.

---

# 2. Callback Hell

## Example

```js
getUser(function(user) {

  getPosts(user.id, function(posts) {

    getComments(posts[0].id, function(comments) {

      console.log(comments);

    });

  });

});
```

## Behavior

- Nested callbacks become difficult to read.
- Code becomes harder to maintain.
- Error handling becomes complicated.
- Promises were introduced to solve this problem.

---

# 3. Promises

## Creating A Promise

```js
const promise = new Promise(

  (resolve, reject) => {

    const success = true;

    if (success) {

      resolve("Success");

    }

    else {

      reject("Failed");

    }

  }

);
```

## Consuming A Promise

```js
promise
  .then((data) => {

    console.log(data);

  })
  .catch((error) => {

    console.error(error);

  })
  .finally(() => {

    console.log("Completed");

  });
```

## Behavior

- Represents a future value.
- Avoids callback hell.
- Supports success and failure handling.
- Improves code readability.

---

# 4. Promise States

## States

```text
Pending
   ↓
Fulfilled
```

OR

```text
Pending
   ↓
Rejected
```

## Behavior

- Pending → Initial state.
- Fulfilled → Operation completed successfully.
- Rejected → Operation failed.

---

# 5. Promise.all()

## Example

```js
Promise.all([

  fetchWeather(),

  fetchForecast()

])
.then((results) => {

  console.log(results);

});
```

## Behavior

- Runs multiple promises simultaneously.
- Waits until all promises complete.
- Fails immediately if any promise fails.

---

# 6. Promise.allSettled()

## Example

```js
Promise.allSettled([

  promise1,

  promise2,

  promise3

]);
```

## Behavior

- Waits for all promises.
- Returns both success and failure results.
- Useful when all responses are required.

---

# 7. Promise.race()

## Example

```js
Promise.race([

  promise1,

  promise2

]);
```

## Behavior

- First settled promise wins.
- Can return success or failure.
- Useful for request timeout patterns.

---

# 8. Promise.any()

## Example

```js
Promise.any([

  promise1,

  promise2,

  promise3

]);
```

## Behavior

- First fulfilled promise wins.
- Ignores rejected promises.
- Fails only if all promises fail.

---

# 9. Async Functions

## Example

```js
async function loadData() {

  return "Weather Data";

}
```

## Behavior

- Always returns a Promise.
- Simplifies asynchronous programming.
- Works seamlessly with await.

---

# 10. Await Keyword

## Example

```js
async function getWeather() {

  const response =
  await fetch(url);

  const data =
  await response.json();

  console.log(data);

}
```

## Behavior

- Pauses execution until promise resolves.
- Makes async code appear synchronous.
- Improves readability.

---

# 11. Try Catch Error Handling

## Example

```js
async function fetchData() {

  try {

    const response =
    await fetch(url);

    const data =
    await response.json();

    return data;

  }

  catch(error) {

    console.error(error);

  }

}
```

## Behavior

- Prevents application crashes.
- Handles network failures gracefully.
- Provides fallback UI opportunities.

---

# 12. Fetch API

## GET Request

```js
const response =
await fetch(url);

const data =
await response.json();
```

## Behavior

- Sends HTTP request.
- Receives server response.
- Converts JSON data into JavaScript objects.

---

# 13. Response Validation

## Example

```js
const response =
await fetch(url);

if (!response.ok) {

  throw new Error(
    `HTTP ${response.status}`
  );

}
```

## Behavior

- Fetch does not throw for 404 or 500 errors.
- Manual validation is required.
- Prevents invalid API responses from being processed.

---

# 14. Loading State

## Example

```js
loadingElement.classList.remove(
  "hidden"
);
```

## Behavior

- Informs users that data is being fetched.
- Improves user experience.
- Prevents confusion during network delays.

---

# 15. Error State

## Example

```js
errorElement.textContent =
"Unable to fetch weather data.";
```

## Behavior

- Displays meaningful error messages.
- Helps users understand failures.
- Improves usability.

---

# 16. Empty State

## Example

```js
weatherContainer.innerHTML =
"Search for a city to view weather.";
```

## Behavior

- Guides users before performing actions.
- Prevents blank screens.
- Improves application clarity.

---

# 17. Event Handling

## Form Submit Event

```js
form.addEventListener(

  "submit",

  handleSearch

);
```

## Behavior

- Captures user interaction.
- Triggers weather search.
- Starts asynchronous workflow.

---

# 18. preventDefault()

## Example

```js
form.addEventListener(

  "submit",

  (e) => {

    e.preventDefault();

  }

);
```

## Behavior

- Prevents page refresh.
- Allows JavaScript-controlled submission.
- Essential for modern frontend applications.

---

# Concepts Learned

- Callbacks
- Callback Hell
- Promises
- Promise States
- Promise.all()
- Promise.allSettled()
- Promise.race()
- Promise.any()
- Async Functions
- Await Keyword
- Try Catch
- Error Handling
- Fetch API
- HTTP Requests
- Response Validation
- Loading State
- Error State
- Empty State
- Event Handling
- preventDefault()

---

# Conclusion

Phase 6 focused on asynchronous JavaScript and API communication.

This phase introduced Callbacks, Promises, Async/Await, Fetch API, Error Handling, and HTTP Requests.

The Weather Dashboard project demonstrated how modern frontend applications communicate with external APIs, handle asynchronous data, manage UI states, and provide a better user experience.

These concepts are widely used in production applications, React projects, API-driven systems, dashboard applications, and frontend interviews.