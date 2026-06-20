# 🔎 GitHub User Search

A GitHub user search web application built using **HTML, CSS, and JavaScript** that allows users to search GitHub profiles, view user information, and update UI dynamically based on application state.

This project demonstrates real-world frontend development concepts including API integration, asynchronous JavaScript, state management, dynamic rendering, performance optimization, and clean code organization.

---

# 🚀 Features

✅ Search GitHub users using GitHub REST API

✅ Dynamic user profile rendering

✅ Display GitHub avatar, username, and followers count

✅ Loading state handling while fetching data

✅ Error handling for invalid usernames

✅ Empty input handling

✅ State-driven UI updates

✅ Async/Await API handling

✅ Separate API, State, and UI logic

✅ Responsive UI structure

---

# 🧠 Concepts Practiced

## JavaScript ES6+

- Async / Await
- Fetch API
- Template Literals
- Event Handling
- Error Handling
- Arrow Functions
- Destructuring
- Spread Operator
- JSON Handling

---

# ⚛️ State Management (Phase 8)

The application follows a state-driven UI approach.

Instead of directly changing the DOM from different places, the application maintains a central state object.

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

The application uses a render function to update UI based on current state.

The UI supports multiple states:

---

## Loading State

While fetching GitHub user data:

Example:

```text
Loading...
```

---

## Success State

After successful API response:

Displays:

- User Avatar
- Username
- Followers Count

Example:

```text
octocat

Followers: 23039
```

---

## Error State

Handles invalid GitHub usernames.

Example:

```text
User not found
```

---

## Empty State

When user does not enter any search value:

Example:

```text
Search a user to see details
```

---

# ⚡ Debouncing

## Purpose

Debouncing prevents unnecessary API calls while typing.

Without debounce:

```
p
pr
pri
priy
priyan
```

Every character can trigger an API request.

This creates unnecessary network requests.

---

With debounce:

```
User typing

      |

Wait for delay

      |

API Request
```

Only the final input triggers the API call.

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

- Reduces API calls
- Improves performance
- Better user experience
- Prevents unnecessary server requests

---

# ⏱️ Throttling

## Purpose

Throttle controls how frequently a function executes.

Common use cases:

- Scroll events
- Resize events
- Infinite scrolling
- Performance optimization

---

## Working

```
Event

 |

Execute Function

 |

Wait

 |

Execute Again
```

---

## Benefits

- Controls repeated function execution
- Improves application performance

---

# 🌐 API Integration

## GitHub REST API

API Endpoint:

```text
https://api.github.com/users/{username}
```

Example:

```text
https://api.github.com/users/octocat
```

The application fetches user information from GitHub API and displays the response dynamically.

---

# 🔧 Async API Flow

Application flow:

```
User enters username

        |

Fetch API Request

        |

GitHub Server Response

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
- Tracking loading status
- Tracking errors

Example:

```js
const state = {

    user:null,

    loading:false,

    error:null

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
async function fetchUser(username){

    const response = await fetch(
    `https://api.github.com/users/${username}`
    );


    if(!response.ok){

        throw new Error("User not found");

    }


    return await response.json();

}
```

---

# app.js

Responsible for:

- DOM selection
- Event handling
- Calling API functions
- Updating state
- Rendering UI

---

# ⚙️ How It Works

1. User enters GitHub username.

2. Enter key event triggers search.

3. Application validates input.

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

Checked response status using:

```js
if(!response.ok)
```

and displayed friendly error message.

---

## 2. Managing UI States

Problem:

Different UI changes needed during API request.

Solution:

Implemented centralized state management.

Handled:

- Loading
- Success
- Error
- Empty

states.

---

## 3. Avoiding Direct DOM Updates

Problem:

Large applications become difficult to maintain.

Solution:

Used state-driven rendering approach.

Flow:

```
Event

↓

State Change

↓

Render

↓

UI Update
```

---

## 4. Code Organization

Problem:

Keeping everything inside one JavaScript file becomes difficult.

Solution:

Separated:

- API logic
- State logic
- Application logic

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
- Event Handling
- Debouncing
- Throttling
- Error Handling

---

# 🚀 Future Improvements

- Search history
- Pagination support
- Infinite scrolling
- Display repositories
- Dark mode
- Followers and following details
- User statistics dashboard
- Better profile card design

---

# 📌 Conclusion

GitHub User Search demonstrates practical frontend development skills including API integration, asynchronous programming, state-driven UI rendering, error handling, and performance optimization.

This project helped understand how modern frontend applications manage user interactions efficiently using structured code organization and clean frontend architecture.