# Phase 2 — Functional JavaScript Practice

---

# 2.1 Array Methods

## map()

### Basic Transformation

#### Question
Convert each number into double value using `map()`.

### Answer

```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2);

console.log(doubled);
```

### Output

```js
[2, 4, 6, 8]
```

---

## Extract Titles

### Answer

```js
const movies = [
  { title: "Inception" },
  { title: "Interstellar" },
  { title: "Jailer" }
];

const titles = movies.map(movie => movie.title);

console.log(titles);
```

### Output

```js
["Inception", "Interstellar", "Jailer"]
```

---

## flat()

### Answer

```js
const arr = [1, [2, 3], [4, [5, 6]]];

console.log(arr.flat());
console.log(arr.flat(2));
```

### Output

```js
[1, 2, 3, 4, [5, 6]]

[1, 2, 3, 4, 5, 6]
```

---

## flatMap()

### Answer

```js
const words = ["hello world", "good day"];

const result = words.flatMap(word =>
  word.split(" ")
);

console.log(result);
```

### Output

```js
["hello", "world", "good", "day"]
```

---

# Filtering Methods

## filter()

### Question
Filter numbers greater than 5.

### Answer

```js
const numbers = [2, 5, 7, 10, 1];

const filtered =
numbers.filter(n => n > 5);

console.log(filtered);
```

### Output

```js
[7, 10]
```

---

## Filter Movies by Rating

### Answer

```js
const movies = [
  { title: "Leo", rating: 7.5 },
  { title: "Interstellar", rating: 8.6 },
  { title: "The Room", rating: 3.7 }
];

const goodMovies =
movies.filter(movie =>
  movie.rating > 8
);

console.log(goodMovies);
```

### Output

```js
[
  { title: "Interstellar", rating: 8.6 }
]
```

---

# Aggregation / Reduction

## reduce()

### Sum of Numbers

#### Question
Find total using `reduce()`.

### Answer

```js
const numbers = [1, 2, 3, 4];

const total =
numbers.reduce(
  (acc, num) => acc + num,
  0
);

console.log(total);
```

### Output

```js
10
```

---

## Group Expenses by Category

### Answer

```js
const expenses = [
  { cat: "food", amt: 100 },
  { cat: "food", amt: 50 },
  { cat: "rent", amt: 1000 }
];

const result =
expenses.reduce((acc, expense) => {

  acc[expense.cat] =
  (acc[expense.cat] || 0)
  + expense.amt;

  return acc;

}, {});

console.log(result);
```

### Output

```js
{
  food: 150,
  rent: 1000
}
```

---

# Searching Methods

## find()

### Answer

```js
const users = [
  { id: 1, name: "Priya" },
  { id: 2, name: "Rahul" }
];

const user =
users.find(u => u.id === 2);

console.log(user);
```

### Output

```js
{ id: 2, name: "Rahul" }
```

---

## includes()

### Answer

```js
const numbers = [1, 2, 3];

console.log(numbers.includes(2));
console.log(numbers.includes(10));
```

### Output

```js
true
false
```

---

## findIndex()

### Answer

```js
const fruits = [
  "apple",
  "orange",
  "mango"
];

const index =
fruits.findIndex(
  fruit => fruit === "mango"
);

console.log(index);
```

### Output

```js
2
```

---

# Boolean Methods

## some()

### Answer

```js
const numbers = [1, 2, 3];

const result =
numbers.some(n => n > 2);

console.log(result);
```

### Output

```js
true
```

---

## every()

### Answer

```js
const numbers = [1, 2, 3];

const result =
numbers.every(n => n > 0);

console.log(result);
```

### Output

```js
true
```

---

# Iteration Method

## forEach()

### Answer

```js
const movies = [
  "Leo",
  "Jailer",
  "Master"
];

movies.forEach(movie => {
  console.log(movie);
});
```

### Output

```js
Leo
Jailer
Master
```

---

# Sorting

## Ascending Order

### Answer

```js
const numbers = [10, 2, 30, 4];

numbers.sort((a, b) => a - b);

console.log(numbers);
```

### Output

```js
[2, 4, 10, 30]
```

---

## Descending Order

### Answer

```js
const numbers = [10, 2, 30, 4];

numbers.sort((a, b) => b - a);

console.log(numbers);
```

### Output

```js
[30, 10, 4, 2]
```

---

# Chaining Methods

### Answer

```js
const movies = [
  {
    title: "Inception",
    rating: 8.8,
    year: 2010
  },

  {
    title: "The Room",
    rating: 3.7,
    year: 2003
  },

  {
    title: "Interstellar",
    rating: 8.6,
    year: 2014
  }
];

const result = movies
  .filter(movie => movie.rating > 8)
  .filter(movie => movie.year > 2010)
  .map(movie => movie.title.toUpperCase())
  .sort();

console.log(result);
```

### Output

```js
["INTERSTELLAR"]
```

---

# 2.2 Higher-Order Functions

## Function as Argument

### Answer

```js
function greet(name, callback) {

  console.log(`Hello ${name}`);

  callback();
}

greet(
  "Priya",
  () => console.log("Done")
);
```

### Output

```js
Hello Priya
Done
```

---

## Function Returning Function

### Answer

```js
function multiplier(factor) {

  return function(num) {
    return num * factor;
  };
}

const double = multiplier(2);

console.log(double(5));
```

### Output

```js
10
```

---

# 2.3 Callbacks

## Synchronous Callback

### Answer

```js
const numbers = [1, 2, 3];

const doubled =
numbers.map(n => n * 2);

console.log(doubled);
```

### Output

```js
[2, 4, 6]
```

---

## Asynchronous Callback

### Answer

```js
setTimeout(() => {

  console.log("Hello after 2 seconds");

}, 2000);
```

### Output

```js
Hello after 2 seconds
```

---

# 2.4 Pure vs Impure Functions

## Pure Function

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

## Impure Function

### Answer

```js
let total = 0;

function addToTotal(num) {
  total += num;
}

addToTotal(5);

console.log(total);
```

### Output

```js
5
```

---

# 2.5 Closures

## Basic Closure Counter

### Answer

```js
function counter() {

  let count = 0;

  return function() {

    count++;

    return count;
  };
}

const myCounter = counter();

console.log(myCounter());
console.log(myCounter());
console.log(myCounter());
```

### Output

```js
1
2
3
```

---

## Private Bank Account

### Answer

```js
function makeBankAccount(balance) {

  return {

    deposit(amount) {
      balance += amount;
    },

    withdraw(amount) {

      if (amount > balance) {
        return "Insufficient Balance";
      }

      balance -= amount;
    },

    getBalance() {
      return balance;
    }

  };
}

const account =
makeBankAccount(1000);

account.deposit(500);

console.log(account.getBalance());
```

### Output

```js
1500
```

---

## Function Factory

### Answer

```js
const taxOf = rate => {

  return function(price) {

    return price * (1 + rate);
  };
};

const tax18 = taxOf(0.18);

console.log(tax18(1000));
```

### Output

```js
1180
```

---

## var vs let Closure Interview Question

### Using var

```js
for (var i = 0; i < 3; i++) {

  setTimeout(() => {

    console.log(i);

  }, 100);
}
```

### Output

```js
3
3
3
```

---

### Using let

```js
for (let i = 0; i < 3; i++) {

  setTimeout(() => {

    console.log(i);

  }, 100);
}
```

### Output

```js
0
1
2
```

---

# Mini Practice Challenges

## Challenge 1

```js
const prices = [100, 200, 300];

const gstPrices =
prices.map(price => price + 50);

console.log(gstPrices);
```

### Output

```js
[150, 250, 350]
```

---

## Challenge 2

```js
const marks = [45, 70, 90, 30];

const passed =
marks.filter(mark => mark >= 50);

console.log(passed);
```

### Output

```js
[70, 90]
```

---

## Challenge 3

```js
const cart = [100, 200, 300];

const total =
cart.reduce(
  (acc, item) => acc + item,
  0
);

console.log(total);
```

### Output

```js
600
```

---

# Concepts Learned

- Array Methods
  - map()
  - filter()
  - reduce()
  - find()
  - findIndex()
  - includes()
  - some()
  - every()
  - forEach()
  - sort()

- Higher-Order Functions

- Callbacks

- Pure Functions

- Impure Functions

- Closures

- Function Factories

- Chaining Methods

- Private Variables using Closures

---

# Conclusion

Phase 2 helped in understanding functional JavaScript concepts used heavily in React and modern frontend development.

Using array methods made the code cleaner and more readable compared to traditional loops.

Closures and higher-order functions improved understanding of how JavaScript handles memory, callbacks, and reusable logic.

Functional programming concepts like `map()`, `filter()`, and `reduce()` are essential for building scalable frontend applications.