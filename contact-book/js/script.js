// DOM Elements
const nameInput =
document.getElementById("name");
const phoneInput =
document.getElementById("phone");
const cityInput =
document.getElementById("city");
const addBtn =
document.getElementById("addBtn");
const searchInput =
document.getElementById("search");
const contactBody =
document.getElementById("contactBody");
// Load from localStorage
let contacts =
JSON.parse(localStorage.getItem("contacts"))
|| [];
// Contact Class
class Contact {
  constructor(name, phone, city) {
    this.id = Date.now();
    this.name = name;
    this.phone = phone;
    this.address = {
      city: city
    };
  }
}
// Save to localStorage
function saveContacts(){
  localStorage.setItem(
    "contacts",
    JSON.stringify(contacts)
  );
}
// Render Contacts
function renderContacts(data){
  contactBody.innerHTML = "";
  data.forEach((contact) => {
    const row =
    document.createElement("tr");
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>${contact.address.city}</td>
      <td>
        <button
          class="deleteBtn"
          onclick="deleteContact(${contact.id})"
        >
          Delete
        </button>
      </td>
    `;
    contactBody.appendChild(row);
  });
}
// Add Contact
function addContact(){
  const name =
  nameInput.value.trim();
  const phone =
  phoneInput.value.trim();
  const city =
  cityInput.value.trim();
  if(
    !name ||
    !phone ||
    !city
  ){
    alert("Please fill all fields");
    return;
  }
  const newContact =
  new Contact(name, phone, city);
  contacts = [
    ...contacts,
    newContact
  ];
  saveContacts();
  renderContacts(contacts);
  nameInput.value = "";
  phoneInput.value = "";
  cityInput.value = "";
}
// Delete Contact
function deleteContact(id){
  contacts =
  contacts.filter(
    contact => contact.id !== id
  );
  saveContacts();
  renderContacts(contacts);
}
// Search Contact
searchInput.addEventListener(
  "input",
  () => {
    const value =
    searchInput.value.toLowerCase();
    const filtered =
    contacts.filter((contact) => {
      return Object.entries(contact).some(
        ([key, val]) => {
          if(typeof val === "object"){
            return Object.values(val)
            .some(v =>
              String(v)
              .toLowerCase()
              .includes(value)
            );
          }
          return String(val)
          .toLowerCase()
          .includes(value);
        }
      );
    });
    renderContacts(filtered);
  }
);
// Event Listener
addBtn.addEventListener(
  "click",
  addContact
);
// Initial Render
renderContacts(contacts);