# Phase 4 — The this Keyword Practice

---

# 4.1 this in Different Contexts

## Global Context

### Question

What does `this` refer to in global scope?

### Answer

```js
console.log(this);
```

### Output

```js
Window {...}
```

---

## Regular Function

### Question

What does `this` refer to inside a regular function?

### Answer

```js
function show() {
  console.log(this);
}

show();
```

### Output

```js
Window {...}
```

---

## Strict Mode

### Question

What happens to `this` inside a regular function in strict mode?

### Answer

```js
"use strict";

function show() {
  console.log(this);
}

show();
```

### Output

```js
undefined
```

---

## Object Method

### Question

Access object properties using `this`.

### Answer

```js
const user = {
  name: "Priya",

  greet() {
    console.log(this.name);
  }
};

user.greet();
```

### Output

```js
Priya
```

---

## Arrow Function Inside Object

### Question

What happens when arrow functions use `this`?

### Answer

```js
const user = {
  name: "Priya",

  greet: () => {
    console.log(this.name);
  }
};

user.greet();
```

### Output

```js
undefined
```

---

## Event Handler with Regular Function

### Question

What does `this` refer to in an event handler?

### Answer

```js
button.addEventListener(
  "click",
  function () {
    console.log(this);
  }
);
```

### Output

```js
<button>...</button>
```

---

## Event Handler with Arrow Function

### Question

What happens when using arrow functions in event handlers?

### Answer

```js
button.addEventListener(
  "click",
  () => {
    console.log(this);
  }
);
```

### Output

```js
Window {...}
```

---

# 4.2 call(), apply(), bind()

## call()

### Question

Use call() to change `this`.

### Answer

```js
function greet(greeting) {
  console.log(
    `${greeting}, ${this.name}`
  );
}

const user = {
  name: "Priya"
};

greet.call(
  user,
  "Hello"
);
```

### Output

```js
Hello, Priya
```

---

## apply()

### Question

Pass arguments using array.

### Answer

```js
function greet(
  greeting,
  punctuation
) {
  console.log(
    `${greeting}, ${this.name}${punctuation}`
  );
}

const user = {
  name: "Priya"
};

greet.apply(
  user,
  ["Hello", "!"]
);
```

### Output

```js
Hello, Priya!
```

---

## bind()

### Question

Create a permanently bound function.

### Answer

```js
function greet(greeting) {
  console.log(
    `${greeting}, ${this.name}`
  );
}

const user = {
  name: "Priya"
};

const sayHi =
greet.bind(
  user,
  "Hi"
);

sayHi();
```

### Output

```js
Hi, Priya
```

---

# Mini Practice Challenges

## Challenge 1

### Question

Print object name using `this`.

### Answer

```js
const user = {
  name: "Priya",

  showName() {
    console.log(this.name);
  }
};

user.showName();
```

### Output

```js
Priya
```

---

## Challenge 2

### Question

Use call() to change `this`.

### Answer

```js
function intro() {
  console.log(this.name);
}

const person = {
  name: "Alice"
};

intro.call(person);
```

### Output

```js
Alice
```

---

# Concepts Learned

- this Keyword
- Global Context
- Regular Functions
- Strict Mode
- Object Methods
- Arrow Functions
- Event Handlers
- call()
- apply()
- bind()
- Function Borrowing
- Context Binding

---

# Conclusion

Phase 4 introduced one of the most important JavaScript concepts: `this`.

This phase explained how `this` behaves differently in global scope, regular functions, object methods, arrow functions, and event handlers.

It also covered `call()`, `apply()`, and `bind()` which are widely used in OOP, frontend development, React, and interview questions.