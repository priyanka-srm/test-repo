# Phase 7 — Browser APIs



# 7.1 localStorage

## Question

What is localStorage?

## Answer

localStorage is a browser storage API that allows data to be stored as key-value pairs inside the browser.

The stored data remains available even after:

- Page Refresh
- Browser Restart
- System Restart

until it is manually removed.

---

## Save Data

### Question

How do we save data in localStorage?

### Answer

Used to store data permanently inside the browser.

### Example

```js
localStorage.setItem(
  "movies",
  JSON.stringify(moviesArray)
);
```

### Behavior

- Creates a key called "movies"
- Stores data as a string
- Existing data is overwritten if the same key already exists

### Use Case

- Favorite Movies
- User Preferences
- Shopping Cart
- Dark Mode Settings

---

## Read Data

### Question

How do we read data from localStorage?

### Answer

Used to retrieve previously stored data.

### Example

```js
const data = JSON.parse(
  localStorage.getItem("movies")
  || "[]"
);
```

### Behavior

- Reads data from storage
- Returns null if the key does not exist
- JSON.parse() converts string back into JavaScript objects

### Use Case

Loading previously saved application data.

---

## Remove Data

### Question

How do we remove a specific item?

### Answer

Used to delete a particular key-value pair.

### Example

```js
localStorage.removeItem(
  "movies"
);
```

### Behavior

- Deletes only the specified key
- Other stored data remains unchanged

---

## Clear All Data

### Question

How do we remove all localStorage data?

### Answer

Used to clear every stored key-value pair.

### Example

```js
localStorage.clear();
```

### Behavior

- Removes all localStorage data
- Cannot be undone

---

## Why JSON is Required

### Question

Why do we use JSON.stringify() and JSON.parse()?

### Answer

localStorage stores only strings.

Objects and arrays must be converted before storing.

### Store Object

```js
localStorage.setItem(
  "user",
  JSON.stringify(user)
);
```

### Read Object

```js
const user = JSON.parse(
  localStorage.getItem("user")
);
```

### Behavior

- JSON.stringify() converts object → string
- JSON.parse() converts string → object

---

## Limitations

### Question

What are the limitations of localStorage?

### Answer

- Synchronous
- ~5MB Storage Limit
- Strings Only
- Per Origin
- Persistent Storage

### Behavior

- Blocks the JavaScript main thread
- Large storage operations may affect performance

---

## Conclusion

localStorage is useful for storing persistent browser data that should remain available across multiple sessions.

---

# 7.2 sessionStorage

## Question

What is sessionStorage?

## Answer

sessionStorage is a browser storage API similar to localStorage.

The main difference is that sessionStorage data is automatically removed when the browser tab is closed.

---

## Save Data

### Question

How do we save data in sessionStorage?

### Answer

Used to store temporary data for the current browser session.

### Example

```js
sessionStorage.setItem(
  "movie",
  "Interstellar"
);
```

### Behavior

- Stores data for the current tab
- Data survives page refresh
- Data disappears when the tab is closed

### Use Case

- Form Drafts
- Temporary User Data
- Recently Viewed Content

---

## Read Data

### Question

How do we retrieve sessionStorage data?

### Answer

Used to access stored session data.

### Example

```js
const movie =
sessionStorage.getItem(
  "movie"
);
```

### Behavior

- Returns stored value
- Returns null if key does not exist

---

## Remove Data

### Question

How do we remove a specific session item?

### Answer

Used to delete a particular sessionStorage entry.

### Example

```js
sessionStorage.removeItem(
  "movie"
);
```

### Behavior

- Deletes only the specified key
- Other session data remains unchanged

---

## Clear All Data

### Question

How do we clear all sessionStorage data?

### Answer

Used to remove all session data.

### Example

```js
sessionStorage.clear();
```

### Behavior

- Removes all sessionStorage entries
- Useful when resetting temporary state

---

## localStorage vs sessionStorage

### Question

What is the difference between localStorage and sessionStorage?

### Answer

| Feature | localStorage | sessionStorage |
|----------|-------------|-------------|
| Persists After Refresh | Yes | Yes |
| Persists After Browser Close | Yes | No |
| Scope | Per Origin | Per Tab |
| Lifetime | Permanent | Temporary |

### Behavior

- localStorage is used for persistent data
- sessionStorage is used for temporary session data

---

## Use Cases

- Multi-Step Forms
- Recently Viewed Movies
- Temporary Application State
- Form Draft Recovery

---

## Conclusion

sessionStorage is useful for storing temporary data that should exist only during the current browser session.

---

# 7.3 URL API

## Question

What is the URL API?

## Answer

The URL API provides a structured and reliable way to create, modify, and manage URLs using JavaScript.

Instead of manually concatenating strings, the URL API provides helper methods for URL manipulation.

---

## Create URL Object

### Question

How do we create a URL object?

### Answer

Used to create a URL instance that can be modified dynamically.

### Example

```js
const url = new URL(
  "https://api.example.com/movies"
);
```

### Behavior

- Creates a URL object
- Provides methods for safely modifying URLs

---

## Add Query Parameters

### Question

How do we add query parameters?

### Answer

Used to append parameters to a URL.

### Example

```js
url.searchParams.set(
  "search",
  "batman"
);

url.searchParams.set(
  "year",
  2020
);
```

### Behavior

- Adds parameters safely
- Automatically handles encoding
- Prevents manual string concatenation mistakes

---

## Generate Final URL

### Question

How do we generate the final URL?

### Answer

Use toString() on the URL object.

### Example

```js
console.log(
  url.toString()
);
```

### Output

```text
https://api.example.com/movies?search=batman&year=2020
```

### Behavior

- Returns the complete URL string
- Includes all query parameters

---

## Use Cases

- Search Filters
- API Requests
- Sorting
- Pagination
- Dynamic Routing

---

## Benefits

- Cleaner Code
- Automatic Encoding
- Easier URL Management
- Better Maintainability

---

## Conclusion

The URL API simplifies URL creation and manipulation while reducing common string-handling errors.

---

# 7.4 URLSearchParams

## Question

What is URLSearchParams?

## Answer

URLSearchParams is a browser API used to read and manipulate query parameters from URLs.

---

## Example URL

```text
https://mysite.com?search=batman
```

---

## Reading Query Parameters

### Question

How do we read query parameters from a URL?

### Answer

Used to extract parameter values from the query string.

### Example

```js
const params =
new URLSearchParams(
  window.location.search
);

const search =
params.get("search");
```

### Output

```js
console.log(search);
```

```text
batman
```

### Behavior

- Reads query string values
- Returns the corresponding parameter value
- Returns null if the parameter does not exist

---

## Why Query Parameters Matter

### Question

Why are query parameters important?

### Answer

Query parameters allow applications to:

- Save Search State
- Create Shareable Links
- Restore Previous State
- Enable Deep Linking
- Improve User Experience

### Behavior

Users can refresh, bookmark, or share the URL without losing application state.

---

## Real World Examples

### Search Page

```text
https://movies.com?search=batman
```

### Product Filter

```text
https://store.com?category=laptop
```

### Pagination

```text
https://blog.com?page=2
```

### Sorting

```text
https://shop.com?sort=price
```

---

## Use Cases

- Search Functionality
- Product Filters
- Pagination
- Dashboard Views
- Client-Side Routing

---

## Conclusion

URLSearchParams makes working with query parameters simple and provides a foundation for modern frontend routing and state restoration.

---

# Concepts Practiced

- Browser APIs
- localStorage
- sessionStorage
- JSON.stringify()
- JSON.parse()
- URL API
- URLSearchParams
- Query Parameters
- State Persistence
- Deep Linking

---

# Key Takeaways

- localStorage is used for permanent browser storage.
- sessionStorage is used for temporary session storage.
- URL API simplifies URL creation and management.
- URLSearchParams simplifies query parameter handling.
- These APIs are essential for building modern frontend applications.

---

# Conclusion

Phase 7 focused on Browser APIs that help web applications store data, maintain state, and manage URLs effectively.

localStorage provides persistent storage, sessionStorage provides temporary session-based storage, URL API simplifies URL creation, and URLSearchParams enables easy query parameter management.

These APIs are widely used in modern frontend applications to improve user experience, maintain application state, and create shareable and bookmarkable URLs.