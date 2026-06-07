# Phase 5 — DOM & Events Deep Dive

---

# 5.1 Event Bubbling vs Capturing

## Event Flow

### Capturing Phase

```text
window
  ↓
document
  ↓
body
  ↓
div
  ↓
button
```

### Bubbling Phase

```text
button
  ↑
div
  ↑
body
  ↑
document
  ↑
window
```

---

## Default Event Bubbling

### Question

How does event bubbling work?

### Answer

```js
const button =
document.querySelector("button");

button.addEventListener(
  "click",
  () => {
    console.log("Clicked");
  }
);
```

### Behavior

- Events travel upward through parent elements.
- Bubbling is the default propagation behavior.
- Parent elements can listen to child events.

---

## Event Capturing

### Question

How to listen during the capturing phase?

### Answer

```js
button.addEventListener(
  "click",
  () => {
    console.log("Capture");
  },
  true
);
```

### Behavior

- Events travel from outer elements to inner elements.
- Capturing happens before the target element is reached.
- Useful when parent elements should react first.

---

# 5.2 event.target vs event.currentTarget

## event.target

### Question

What is event.target?

### Answer

```js
parent.addEventListener(
  "click",
  (e) => {
    console.log(e.target);
  }
);
```

### Behavior

- Refers to the actual element that triggered the event.
- Can be a nested child element.
- Commonly used in event delegation.

---

## event.currentTarget

### Question

What is event.currentTarget?

### Answer

```js
parent.addEventListener(
  "click",
  (e) => {
    console.log(
      e.currentTarget
    );
  }
);
```

### Behavior

- Refers to the element that owns the listener.
- Remains constant regardless of the clicked child.
- Useful when working with parent listeners.

---

## Difference Between target and currentTarget

### Answer

```js
parent.addEventListener(
  "click",
  (e) => {

    console.log(
      e.target
    );

    console.log(
      e.currentTarget
    );

  }
);
```

### Behavior

- event.target identifies the clicked element.
- event.currentTarget identifies the listener owner.
- Both may refer to different elements.

---

# 5.3 preventDefault()

## Prevent Form Submission

### Question

How to stop default browser behavior?

### Answer

```js
form.addEventListener(
  "submit",
  (e) => {

    e.preventDefault();

  }
);
```

### Behavior

- Stops automatic form submission.
- Prevents page refresh.
- Allows custom validation logic.

---

## Prevent Link Navigation

### Answer

```js
link.addEventListener(
  "click",
  (e) => {

    e.preventDefault();

  }
);
```

### Behavior

- Stops browser navigation.
- Allows custom JavaScript actions.
- Useful in Single Page Applications.

---

# 5.4 stopPropagation()

## Stop Event Bubbling

### Question

How to stop event propagation?

### Answer

```js
child.addEventListener(
  "click",
  (e) => {

    e.stopPropagation();

  }
);
```

### Behavior

- Stops event bubbling.
- Parent listeners will not execute.
- Useful when nested elements have separate actions.

---

# 5.5 Event Delegation

## Without Event Delegation

### Question

Adding listeners individually.

### Answer

```js
buttons.forEach((btn) => {

  btn.addEventListener(
    "click",
    handleClick
  );

});
```

### Behavior

- Creates multiple event listeners.
- Consumes more memory.
- Harder to maintain dynamic elements.

---

## With Event Delegation

### Question

Using a single parent listener.

### Answer

```js
container.addEventListener(
  "click",
  (e) => {

    const card =
    e.target.closest(
      ".movieCard"
    );

    if (card) {

      handleCard(
        card.dataset.id
      );

    }

  }
);
```

### Behavior

- Uses only one listener.
- Works for dynamically added elements.
- Improves performance and scalability.

---

## closest()

### Question

Find nearest matching ancestor.

### Answer

```js
const card =
e.target.closest(
  ".movieCard"
);
```

### Behavior

- Searches upward in the DOM tree.
- Returns nearest matching element.
- Useful in event delegation patterns.

---

# Mini Practice Challenges

## Challenge 1

### Question

Print clicked button text.

### Answer

```js
button.addEventListener(
  "click",
  (e) => {

    console.log(
      e.target.textContent
    );

  }
);
```

### Behavior

- Retrieves content from the clicked element.
- Uses event.target for identification.

---

## Challenge 2

### Question

Stop parent click event.

### Answer

```js
child.addEventListener(
  "click",
  (e) => {

    e.stopPropagation();

  }
);
```

### Behavior

- Event remains within the child element.
- Parent listeners are skipped.

---

## Challenge 3

### Question

Prevent page refresh on submit.

### Answer

```js
form.addEventListener(
  "submit",
  (e) => {

    e.preventDefault();

  }
);
```

### Behavior

- Form submission is controlled manually.
- Browser refresh does not occur.

---

# Concepts Learned

- Event Bubbling
- Event Capturing
- Event Flow
- event.target
- event.currentTarget
- preventDefault()
- stopPropagation()
- Event Delegation
- closest()
- Dynamic Event Handling
- DOM Events

---

# Conclusion

Phase 5 focused on advanced DOM event handling concepts.

This phase introduced Event Bubbling, Event Capturing, event.target, event.currentTarget, preventDefault(), stopPropagation(), and Event Delegation.

These concepts are widely used in modern JavaScript applications, dynamic user interfaces, drag-and-drop systems, Kanban boards, React applications, and frontend interviews.