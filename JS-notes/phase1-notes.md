#  Phase 1 — Modern JavaScript (ES6+) Practice

---

# 1.1 Arrow Functions

##  Basic Arrow Function

### Question
Convert normal function into arrow function.

```js
const add = function(a, b) {
  return a + b;
};
```

### Answer

```js
const add = (a, b) => a + b;

console.log(add(2, 3));
```

### Output

```js
5
```

---

##  Square Number

### Question

Create an arrow function to square a number.

### Answer

```js
const square = n => n * n;

console.log(square(5));
```

### Output

```js
25
```

---

##  Multi-line Arrow Function

### Question

Create a function that adds two numbers and returns sum + 1.

### Answer

```js
const sumPlus = (a, b) => {
  const sum = a + b;
  return sum + 1;
};

console.log(sumPlus(2, 3));
```

### Output

```js
6
```

---

# 1.2 Template Literals

##  Basic Template Literal

### Question

Print:
Hello Priya! You are 22 years old.

### Answer

```js
const name = "Priya";
const age = 22;

console.log(`Hello ${name}! You are ${age} years old.`);
```

### Output

```js
Hello Priya! You are 22 years old.
```

---

##  Multi-line String

### Answer

```js
const title = "RCB";

const html = `
<div>
  <h1>${title}</h1>
</div>
`;

console.log(html);
```

---

# 1.3 Destructuring

##  Object Destructuring

### Question

Extract title and rating from object.

### Answer

```js
const movie = {
  title: "Inception",
  rating: 8.8
};

const { title, rating } = movie;

console.log(title);
console.log(rating);
```

### Output

```js
Inception
8.8
```

---

##  Rename Variables

### Answer

```js
const movie = {
  title: "Interstellar",
  year: 2014
};

const { title: movieTitle, year: releaseYear } = movie;

console.log(movieTitle);
console.log(releaseYear);
```

---

##  Default Values

### Answer

```js
const user = {
  name: "Priya"
};

const { city = "Chennai" } = user;

console.log(city);
```

### Output

```js
Chennai
```

---

##  Array Destructuring

### Answer

```js
const colors = ["red", "green", "blue"];

const [first, second] = colors;

console.log(first);
console.log(second);
```

### Output

```js
red
green
```

---

##  Swap Variables

### Answer

```js
let a = 10;
let b = 20;

[a, b] = [b, a];

console.log(a);
console.log(b);
```

### Output

```js
20
10
```

---

# 1.4 Spread and Rest Operators

##  Spread Operator

### Question

Merge two arrays.

### Answer

```js
const arr1 = [1, 2];
const arr2 = [3, 4];

const merged = [...arr1, ...arr2];

console.log(merged);
```

### Output

```js
[1, 2, 3, 4]
```

---

##  Copy Array

### Answer

```js
const numbers = [1, 2, 3];

const copy = [...numbers];

console.log(copy);
```

---

##  Object Spread

### Answer

```js
const user = {
  name: "Priya",
  age: 22
};

const updatedUser = {
  ...user,
  city: "Chennai"
};

console.log(updatedUser);
```

---

##  Rest Parameters

### Answer

```js
function total(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(total(1, 2, 3, 4));
```

### Output

```js
10
```

---

# 1.5 Default Parameters

##  Basic Default Parameter

### Answer

```js
function greet(name = "Guest") {
  return `Hello ${name}`;
}

console.log(greet());
console.log(greet("Priya"));
```

### Output

```js
Hello Guest
Hello Priya
```

---

# 1.6 Optional Chaining and Nullish Coalescing

##  Optional Chaining

### Answer

```js
const user = {
  profile: {
    name: "Priya"
  }
};

console.log(user?.profile?.name);
console.log(user?.address?.city);
```

### Output

```js
Priya
undefined
```

---

##  Nullish Coalescing

### Answer

```js
const rating = 0;

console.log(rating ?? "No rating");
console.log(rating || "No rating");
```

### Output

```js
0
No rating
```

---

#  Mini Practice Challenges

## Challenge 1

```js
const nums = [1, 2, 3];

const doubled = nums.map(n => n * 2);

console.log(doubled);
```

### Output

```js
[2, 4, 6]
```

---

## Challenge 2

```js
const student = {
  name: "Priya",
  mark: 95
};

const { name, mark } = student;

console.log(`${name} scored ${mark}`);
```

### Output

```js
Priya scored 95
```

---

#  Concepts Learned

- Arrow Functions
- Template Literals
- Object Destructuring
- Array Destructuring
- Spread Operator
- Rest Parameters
- Default Parameters
- Optional Chaining
- Nullish Coalescing

---

#  Conclusion

Phase 1 helped understand modern JavaScript syntax used in React and frontend development.  
The code became cleaner, shorter, and easier to read using ES6+ features.
