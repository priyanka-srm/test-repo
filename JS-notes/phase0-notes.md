# Phase 0 — Output Prediction Quiz

## Question 1

```js
console.log(a);
var a = 10;
```

### Predicted Output
```js
undefined
```

### Actual Output
```js
undefined
```

---

## Question 2

```js
console.log(b);
let b = 20;
```

### Predicted Output
```js
ReferenceError
```

### Actual Output
```js
ReferenceError
```

---

## Question 3

```js
function test() {
  if(true){
    var x = 10;
  }

  console.log(x);
}

test();
```

### Predicted Output
```js
10
```

### Actual Output
```js
10
```

---

## Question 4

```js
function test() {
  if(true){
    let y = 20;
  }

  console.log(y);
}

test();
```

### Predicted Output
```js
ReferenceError
```

### Actual Output
```js
ReferenceError
```

---

## Question 5

```js
console.log(5 == "5");
console.log(5 === "5");
```

### Predicted Output
```js
true
false
```

### Actual Output
```js
true
false
```

---

## Question 6

```js
console.log(num);

function num(){
  return 10;
}
```

### Predicted Output
```js
[Function: num]
```

### Actual Output
```js
[Function: num]
```

---

## Question 7

```js
var a = 5;

function demo(){
  console.log(a);
}

demo();
```

### Predicted Output
```js
5
```

### Actual Output
```js
5
```

---

## Question 8

```js
let a = 10;

{
  let a = 20;
  console.log(a);
}

console.log(a);
```

### Predicted Output
```js
20
10
```

### Actual Output
```js
20
10
```

---

## Question 9

```js
var a = 1;

function test(){
  var a = 2;
  console.log(a);
}

test();
console.log(a);
```

### Predicted Output
```js
2
1
```

### Actual Output
```js
2
1
```

---

## Question 10

```js
console.log(typeof null);
```

### Predicted Output
```js
object
```

### Actual Output
```js
object
```

---

## Question 11

```js
console.log(typeof []);
```

### Predicted Output
```js
object
```

### Actual Output
```js
object
```

---

## Question 12

```js
console.log([] == false);
console.log([] === false);
```

### Predicted Output
```js
true
false
```

### Actual Output
```js
true
false
```

---

## Question 13

```js
console.log(null == undefined);
console.log(null === undefined);
```

### Predicted Output
```js
true
false
```

### Actual Output
```js
true
false
```

---

## Question 14

```js
var a = 10;

function test(){
  console.log(a);
  var a = 20;
}

test();
```

### Predicted Output
```js
undefined
```

### Actual Output
```js
undefined
```

---

## Question 15

```js
let a = 5;

function demo(){
  console.log(a);
}

function outer(){
  let a = 20;
  demo();
}

outer();
```

### Predicted Output
```js
5
```

### Actual Output
```js
5
```

---

## Question 16

```js
if(true){
  var x = 100;
}

console.log(x);
```

### Predicted Output
```js
100
```

### Actual Output
```js
100
```

---

## Question 17

```js
if(true){
  const y = 200;
}

console.log(y);
```

### Predicted Output
```js
ReferenceError
```

### Actual Output
```js
ReferenceError
```

---

## Question 18

```js
console.log(Boolean(""));
console.log(Boolean("hello"));
```

### Predicted Output
```js
false
true
```

### Actual Output
```js
false
true
```

---

## Question 19

```js
console.log(NaN == NaN);
console.log(NaN === NaN);
```

### Predicted Output
```js
false
false
```

### Actual Output
```js
false
false
```

---

## Question 20

```js
const a = {
  name: "Priya"
};

a.name = "Sam";

console.log(a.name);
```

### Predicted Output
```js
Sam
```

### Actual Output
```js
Sam
```