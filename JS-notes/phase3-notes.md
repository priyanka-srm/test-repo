# Phase 3 — Objects & Data Structures Practice

---

# 3.1 Nested Objects & Dynamic Keys

## Nested Object Access

### Question

Access city from nested object.

### Answer

```js
const user = {
  name: "Alice",
  address: {
    city: "Chennai",
    pincode: "600001"
  }
};

const city = user.address.city;

console.log(city);
```

### Output

```js
Chennai
```

---

## Optional Chaining

### Question

Safely access nested values.

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

## Dynamic Keys

### Question

Access object property using variable.

### Answer

```js
const user = {
  name: "Priya",
  age: 22
};

const key = "name";

console.log(user[key]);
```

### Output

```js
Priya
```

---

## Computed Property Names

### Question

Create object using dynamic key.

### Answer

```js
const field = "age";

const obj = {
  [field]: 25
};

console.log(obj);
```

### Output

```js
{ age: 25 }
```

---

# 3.2 Object Methods

## Object.keys()

### Question

Get all object keys.

### Answer

```js
const movie = {
  title: "Inception",
  year: 2010,
  rating: 8.8
};

console.log(Object.keys(movie));
```

### Output

```js
["title", "year", "rating"]
```

---

## Object.values()

### Answer

```js
const movie = {
  title: "Inception",
  year: 2010,
  rating: 8.8
};

console.log(Object.values(movie));
```

### Output

```js
["Inception", 2010, 8.8]
```

---

## Object.entries()

### Answer

```js
const movie = {
  title: "Inception",
  year: 2010,
  rating: 8.8
};

console.log(Object.entries(movie));
```

### Output

```js
[
  ["title", "Inception"],
  ["year", 2010],
  ["rating", 8.8]
]
```

---

## Looping Object Entries

### Question

Print key and value using Object.entries().

### Answer

```js
const movie = {
  title: "Inception",
  year: 2010,
  rating: 8.8
};

Object.entries(movie).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

### Output

```js
title: Inception
year: 2010
rating: 8.8
```

---

## Object Merge using Spread

### Answer

```js
const movie = {
  title: "Inception",
  year: 2010,
  rating: 8.8
};

const updatedMovie = {
  ...movie,
  rating: 9.0
};

console.log(updatedMovie);
```

### Output

```js
{
  title: "Inception",
  year: 2010,
  rating: 9
}
```

---

## Object Merge using Object.assign()

### Answer

```js
const movie = {
  title: "Inception",
  year: 2010
};

const updated = Object.assign({}, movie, {
  rating: 8.8
});

console.log(updated);
```

### Output

```js
{
  title: "Inception",
  year: 2010,
  rating: 8.8
}
```

---

# 3.3 JSON Handling

## JSON.stringify()

### Question

Convert object into JSON string.

### Answer

```js
const user = {
  name: "Priya",
  age: 22
};

const jsonData = JSON.stringify(user);

console.log(jsonData);
```

### Output

```js
{"name":"Priya","age":22}
```

---

## JSON.parse()

### Question

Convert JSON string into object.

### Answer

```js
const jsonString = '{"name":"Priya","age":22}';

const parsed = JSON.parse(jsonString);

console.log(parsed);
```

### Output

```js
{ name: "Priya", age: 22 }
```

---

## Pretty Print JSON

### Answer

```js
const user = {
  name: "Priya",
  age: 22
};

console.log(JSON.stringify(user, null, 2));
```

### Output

```js
{
  "name": "Priya",
  "age": 22
}
```

---

# 3.4 Deep vs Shallow Clone

## Shallow Clone using Spread

### Question

Create shallow copy of object.

### Answer

```js
const original = {
  name: "Priya",
  address: {
    city: "Chennai"
  }
};

const copy = { ...original };

copy.address.city = "Mumbai";

console.log(original.address.city);
```

### Output

```js
Mumbai
```

---

## Deep Clone using JSON

### Answer

```js
const original = {
  name: "Priya",
  address: {
    city: "Chennai"
  }
};

const deepCopy =
JSON.parse(JSON.stringify(original));

deepCopy.address.city = "Delhi";

console.log(original.address.city);
console.log(deepCopy.address.city);
```

### Output

```js
Chennai
Delhi
```

---

## Deep Clone using structuredClone()

### Answer

```js
const original = {
  name: "Priya",
  address: {
    city: "Chennai"
  }
};

const deepCopy = structuredClone(original);

deepCopy.address.city = "Bangalore";

console.log(original.address.city);
console.log(deepCopy.address.city);
```

### Output

```js
Chennai
Bangalore
```

---

# 3.5 Classes (ES6)

## Basic Class

### Question

Create Movie class with constructor and method.

### Answer

```js
class Movie {

  constructor(title, year) {
    this.title = title;
    this.year = year;
  }

  getInfo() {
    return `${this.title} (${this.year})`;
  }

}

const movie1 =
new Movie("Inception", 2010);

console.log(movie1.getInfo());
```

### Output

```js
Inception (2010)
```

---

## Static Method

### Answer

```js
class Movie {

  constructor(title, year) {
    this.title = title;
    this.year = year;
  }

  static compare(m1, m2) {
    return m1.year - m2.year;
  }

}

const m1 = new Movie("Movie A", 2015);
const m2 = new Movie("Movie B", 2020);

console.log(Movie.compare(m1, m2));
```

### Output

```js
-5
```

---

## Class Inheritance

### Question

Extend Movie class using Series class.

### Answer

```js
class Movie {

  constructor(title, year) {
    this.title = title;
    this.year = year;
  }

}

class Series extends Movie {

  constructor(title, year, seasons) {
    super(title, year);
    this.seasons = seasons;
  }

}

const series1 =
new Series("Dark", 2017, 3);

console.log(series1);
```

### Output

```js
Series {
  title: "Dark",
  year: 2017,
  seasons: 3
}
```

---

# 3.6 Set and Map

## Set

### Question

Store only unique values.

### Answer

```js
const unique =
new Set([1, 2, 2, 3, 3, 3]);

console.log(unique);
```

### Output

```js
Set {1, 2, 3}
```

---

## Remove Duplicates using Set

### Answer

```js
const numbers =
[1, 2, 2, 3, 3, 4];

const dedup =
[...new Set(numbers)];

console.log(dedup);
```

### Output

```js
[1, 2, 3, 4]
```

---

## Map

### Question

Store key-value pairs.

### Answer

```js
const users = new Map();

users.set("user1", {
  name: "Priya"
});

console.log(users.get("user1"));
```

### Output

```js
{ name: "Priya" }
```

---

# Mini Practice Challenges

## Challenge 1

### Question

Print all keys and values.

### Answer

```js
const student = {
  name: "Priya",
  mark: 95
};

Object.entries(student).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

### Output

```js
name: Priya
mark: 95
```

---

## Challenge 2

### Question

Remove duplicate values from array.

### Answer

```js
const nums =
[1, 2, 2, 3, 4, 4];

const uniqueNums =
[...new Set(nums)];

console.log(uniqueNums);
```

### Output

```js
[1, 2, 3, 4]
```

---

# Concepts Learned

- Nested Objects
- Optional Chaining
- Dynamic Keys
- Computed Property Names
- Object.keys()
- Object.values()
- Object.entries()
- Object.assign()
- JSON.stringify()
- JSON.parse()
- Shallow Clone
- Deep Clone
- structuredClone()
- Classes
- Constructor
- Static Methods
- Inheritance
- Set
- Map

---

# Conclusion

Phase 3 helped understand how JavaScript handles objects, nested data, cloning, JSON conversion, and advanced data structures like Set and Map.

This phase also introduced ES6 Classes and object-based programming concepts that are commonly used in frontend development, APIs, localStorage handling, and interview coding questions.