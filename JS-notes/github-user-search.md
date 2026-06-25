# 🔎 GitHub User Search

A GitHub user search web application built using **HTML, CSS, and JavaScript** that allows users to search GitHub profiles and display user information dynamically.

This project demonstrates frontend concepts including API integration, asynchronous JavaScript, state management, dynamic rendering, performance optimization, and clean code organization.

---

# 🚀 Features

✅ Search GitHub users using GitHub REST API

✅ Search-as-you-type functionality using Debouncing

✅ Dynamic user profile rendering

✅ Display GitHub avatar, username, and followers count

✅ Loading state handling while fetching data

✅ Error handling for invalid usernames

✅ Empty input handling

✅ State-driven UI updates

✅ Async/Await API handling

✅ AbortController for cancelling previous API requests

✅ Separate API, State, and UI logic

✅ Responsive UI structure

---

# 🧠 Concepts Practiced

## JavaScript ES6+

- Async / Await
- Fetch API
- Event Handling
- Error Handling
- Arrow Functions
- Spread Operator
- JSON Handling
- Closures
- setTimeout()
- AbortController


---

# ⚛️ State Management

The application follows a state-driven UI approach.

Instead of directly modifying the DOM from multiple places, the application maintains a central state object.

Flow:

```
User Action

      |

State Update

      |

Render Function

      |

UI Update
```

Example:

```js
const state = {

    user: null,

    loading: false,

    error: null,

    query: ""

};
```

The state acts as the single source of truth for the application.

---

# 🔄 UI Rendering System

The application updates UI using a render function based on the current state.

The UI handles different states:

---

## Loading State

While fetching GitHub user data:

Example:

```
loading...
```

---

## Success State

After successful API response:

Displays:

- User Avatar
- Username
- Followers Count


Example:

```
octocat

Followers: 23039
```

---

## Error State

Handles invalid GitHub usernames.

Example:

```
User not found
```

---

## Empty State

When input is empty:

Example:

```
Search a user to see details
```

---

# ⚡ Debouncing

## Purpose

Debouncing prevents unnecessary API requests while typing.

Without debounce:

```
p

pr

pri

priy

priya
```

Every character can trigger an API request.

This creates unnecessary network calls.

---

With debounce:

```
User typing

      |

Wait for delay

      |

API Request
```

Only after the user stops typing, the search function executes.

---

## Debounce Implementation

```js
function debounce(fn, delay){

    let timer;

    return function(...args){

        clearTimeout(timer);

        timer = setTimeout(()=>{

            fn.apply(this,args);

        }, delay);

    };

}
```

---

## Benefits

- Reduces unnecessary API calls
- Improves performance
- Creates smoother user experience
- Prevents excessive requests

---

# 🛑 AbortController

## Purpose

Debouncing reduces API calls, but multiple requests can still overlap.

Older API responses may return later and overwrite newer results.

AbortController cancels previous requests when a new search starts.

---

Example:

```
Request 1

Request 2

Request 3
```

Previous request is cancelled before starting a new one.

---

Implementation:

```js
controller.abort();

controller = new AbortController();
```

Fetch request receives the signal:

```js
fetch(url,{
 signal: controller.signal
})
```

Benefits:

- Prevents stale responses
- Keeps UI data correct
- Handles API race conditions

---

# 🌐 API Integration

## GitHub REST API

Endpoint:

```
https://api.github.com/users/{username}
```

Example:

```
https://api.github.com/users/octocat
```

The application fetches GitHub user data and displays it dynamically.

---

# 🔧 Async API Flow

Application flow:

```
User types username

        |

Debounce waits

        |

Fetch API Request

        |

GitHub Response

        |

Update State

        |

Render UI

```

---

# 📁 Project Structure

```
github-user-search/

│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│
│   ├── state.js
│   ├── api.js
│   └── app.js
│
└── README.md
```

---

# 🏗️ Code Architecture

The project follows separation of responsibilities.

Each file has a specific role.

---

# state.js

Responsible for:

- Managing application state
- Storing user data
- Tracking loading state
- Tracking errors


Example:

```js
const state = {

    user:null,

    loading:false,

    error:null,

    query:""

};
```

---

# api.js

Responsible for:

- API communication
- Fetch requests
- Handling API errors


Example:

```js
async function fetchUser(username, signal){

const response =
await fetch(
`https://api.github.com/users/${username}`,
{signal}
);


if(!response.ok){

throw new Error("User not found");

}


return response.json();

}
```

---

# app.js

Responsible for:

- DOM selection
- Event handling
- Debounce logic
- AbortController handling
- Calling API functions
- Updating state
- Rendering UI

---

# ⚙️ How It Works

1. User types GitHub username.

2. Debounce waits for typing to stop.

3. Previous API request is cancelled using AbortController.

4. Loading state is activated.

5. Fetch request is sent to GitHub API.

6. API response is received.

7. State object is updated.

8. Render function updates UI.

9. User information is displayed.

---

# 🎯 Challenges Solved

## 1. API Error Handling

Problem:

Invalid usernames return API errors.

Solution:

Checked response status:

```js
if(!response.ok)
```

and displayed error message.

---

## 2. Managing UI States

Problem:

Different UI changes were needed during API requests.

Solution:

Implemented centralized state management.

Handled:

- Loading
- Success
- Error
- Empty

states.

---

## 3. Avoiding Unsafe DOM Updates

Problem:

Using innerHTML with external data can create security issues.

Solution:

Used createElement() and textContent.

Example:

```js
element.textContent = text;
```

This prevents unwanted HTML execution.

---

## 4. Handling API Race Conditions

Problem:

Old API responses can overwrite newer searches.

Solution:

Used AbortController to cancel previous requests.

---

## 5. Code Organization

Problem:

Keeping all logic inside one file becomes difficult.

Solution:

Separated:

- API logic
- State logic
- UI logic

---

# 🛠️ Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript ES6+

## API

- GitHub REST API

## Concepts

- Fetch API
- Async/Await
- State Management
- DOM Manipulation
- Debouncing
- AbortController
- Error Handling

---

# 🚀 Future Improvements

- Search history
- Pagination support
- Display repositories
- Dark mode
- Followers and following details
- User statistics dashboard
- Better profile card design

---

# 📌 Conclusion

GitHub User Search demonstrates practical frontend development skills including API integration, asynchronous programming, state-driven rendering, performance optimization, and clean code architecture.

This project helped understand how modern frontend applications handle user interactions efficiently using structured JavaScript patterns.