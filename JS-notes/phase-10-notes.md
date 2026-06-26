# Phase 10 --- Code Architecture & Modules

## 10.1 ES6 Modules Introduction

### Question

What are ES6 Modules in JavaScript?

### Answer

ES6 Modules allow JavaScript code to be divided into separate files and
reused between files.

Instead of writing all application logic inside one large JavaScript
file, modules help organize code into smaller independent pieces.

### Example

Without Modules:

``` js
function fetchMovies(){

}

function renderMovies(){

}

function handleSearch(){

}
```

With Modules:

    movie-app/

    ├── api.js
    ├── ui.js
    ├── state.js
    ├── handlers.js
    └── app.js

### Problems

-   Large files become difficult to maintain
-   Logic gets mixed together
-   Debugging becomes harder
-   Code reuse becomes difficult

### Benefits

-   Better code organization
-   Reusable functions
-   Cleaner architecture
-   Easier maintenance

### Conclusion

ES6 Modules help create scalable and maintainable JavaScript
applications.

------------------------------------------------------------------------

## 10.2 Named Export

### Question

What is Named Export?

### Answer

Named export allows multiple values to be exported from a file.

### Example

utils.js

``` js
export function formatDate(date){
    return date.toDateString();
}

export function capitalize(str){
    return str.toUpperCase();
}
```

app.js

``` js
import { formatDate, capitalize }
from "./utils.js";
```

### Problems

-   Without exports, code cannot be shared
-   Duplicate code increases

### Benefits

-   Reusable functions
-   Cleaner imports
-   Better separation

### Conclusion

Named exports are useful for sharing multiple functions from a module.

------------------------------------------------------------------------

## 10.3 Default Export

### Question

What is Default Export?

### Answer

Default export exports one main value from a file.

### Example

``` js
export default function MovieCard(movie){

}
```

``` js
import MovieCard from "./movieCard.js";
```

### Problems

-   Main functionality becomes unclear

### Benefits

-   Simple import syntax
-   Good for single responsibility files

### Conclusion

Default exports are useful when a file has one main purpose.

------------------------------------------------------------------------

## 10.4 Separation of Concerns

### Question

What is Separation of Concerns?

### Answer

It means dividing application code into different files where each file
handles one responsibility.

### Example

    movie-app/

    api.js
    ui.js
    state.js
    handlers.js
    app.js

### Responsibilities

api.js: - API requests - Fetch handling - Errors

ui.js: - DOM rendering

state.js: - Application data

handlers.js: - Events

app.js: - Connects everything

### Problems

-   One huge file
-   Difficult debugging
-   Hard maintenance

### Benefits

-   Clean structure
-   Easy testing
-   Scalable code

### Conclusion

Separation of Concerns creates professional frontend architecture.

------------------------------------------------------------------------

## 10.5 npm Basics

### Question

What is npm?

### Answer

npm is Node Package Manager used to install and manage JavaScript
packages.

### Example

``` bash
npm install package-name
```

### Problems

-   Manual dependency management
-   Difficult package updates

### Benefits

-   Easy package installation
-   Dependency management

### Conclusion

npm is an important tool for modern JavaScript development.

------------------------------------------------------------------------

## 10.6 package.json

### Question

What is package.json?

### Answer

package.json stores project information, scripts, and dependencies.

### Example

``` json
{
"name":"movie-app",
"version":"1.0.0"
}
```

### Problems

Without it: - Project configuration becomes difficult

### Benefits

-   Stores project settings
-   Manages dependencies

### Conclusion

package.json is the configuration file of a JavaScript project.

------------------------------------------------------------------------

# Key Takeaways

-   ES6 Modules divide code into files.
-   Export and import connect modules.
-   Separation of Concerns improves maintainability.
-   npm manages packages.
-   package.json manages project configuration.
-   Modular architecture prepares developers for React.

# Conclusion

Phase 10 introduces professional frontend architecture.

Learning modules and clean code organization helps developers build
scalable applications similar to real-world projects.
