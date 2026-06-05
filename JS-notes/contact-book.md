# Phase 3 Mini Project – Contact Book

## Project Overview
The Contact Book is a simple web application created using HTML, CSS, and JavaScript.  
It allows users to:

- Add contacts
- View contacts
- Delete contacts
- Store contact details dynamically

This project helps in understanding:

- DOM Manipulation
- Event Handling
- Arrays & Objects
- Dynamic UI Updates
- Form Handling in JavaScript

---

# File Structure

```bash
contact-book/
│
├── index.html
├── style.css
└── script.js
```

---

# index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contact Book</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="container">

    <h1>Contact Book</h1>

    <div class="form-section">
      <input type="text" id="name" placeholder="Enter Name">
      <input type="number" id="phone" placeholder="Enter Phone Number">
      <button id="addBtn">Add Contact</button>
    </div>

    <div class="contact-list" id="contactList">

    </div>

  </div>

  <script src="script.js"></script>
</body>
</html>
```

---

# style.css

```css
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

body{
    background:#f0f2f5;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
}

.container{
    background:white;
    width:400px;
    padding:25px;
    border-radius:10px;
    box-shadow:0 0 10px rgba(0,0,0,0.2);
}

h1{
    text-align:center;
    margin-bottom:20px;
    color:#333;
}

.form-section{
    display:flex;
    flex-direction:column;
    gap:15px;
}

input{
    padding:10px;
    border:1px solid #ccc;
    border-radius:5px;
    font-size:16px;
}

button{
    padding:10px;
    background:#007bff;
    color:white;
    border:none;
    border-radius:5px;
    cursor:pointer;
    font-size:16px;
}

button:hover{
    background:#0056b3;
}

.contact-list{
    margin-top:20px;
}

.contact-card{
    background:#f8f8f8;
    padding:15px;
    border-radius:8px;
    margin-bottom:10px;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.contact-info h3{
    margin-bottom:5px;
    color:#333;
}

.delete-btn{
    background:red;
    padding:8px 12px;
    border:none;
    color:white;
    border-radius:5px;
    cursor:pointer;
}

.delete-btn:hover{
    background:darkred;
}
```

---

# script.js

```javascript
let addBtn = document.getElementById("addBtn");
let contactList = document.getElementById("contactList");

addBtn.addEventListener("click", function(){

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;

    if(name === "" || phone === ""){
        alert("Please fill all fields");
        return;
    }

    let contactCard = document.createElement("div");
    contactCard.classList.add("contact-card");

    contactCard.innerHTML = `
        <div class="contact-info">
            <h3>${name}</h3>
            <p>${phone}</p>
        </div>

        <button class="delete-btn">Delete</button>
    `;

    contactList.appendChild(contactCard);

    let deleteBtn = contactCard.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function(){
        contactCard.remove();
    });

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
});
```

---

# Features Implemented

## HTML
- Form Inputs
- Buttons
- Container Layout
- Contact Display Section

## CSS
- Responsive Center Layout
- Card Design
- Hover Effects
- Modern UI Styling

## JavaScript
- DOM Manipulation
- Event Listeners
- Dynamic Element Creation
- Delete Functionality
- Form Validation

---

# Output

The project displays:

- Name Input Field
- Phone Number Input Field
- Add Contact Button
- Dynamic Contact Cards
- Delete Button for Each Contact

---

# Concepts Used

- Variables
- Functions
- addEventListener()
- querySelector()
- createElement()
- appendChild()
- remove()
- Template Literals
- DOM Manipulation

---

# Conclusion

The Contact Book project successfully demonstrates the basics of front-end web development using HTML, CSS, and JavaScript.

This project improved understanding of:

- DOM Manipulation
- Dynamic Content Rendering
- User Interaction Handling
- JavaScript Event Handling

This mini project is suitable for beginners to practice JavaScript fundamentals and front-end development concepts.