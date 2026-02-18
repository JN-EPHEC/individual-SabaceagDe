const userList = document.getElementById("user-list");
const form = document.getElementById("user-form");
const nameInput = document.getElementById("name");
const firstnameInput = document.getElementById("firstname");

// load users onload
async function loadUsers() {
  userList.innerHTML = "";

  const response = await fetch("/api/users");
  const users = await response.json();

  users.forEach(user => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      ${user.name}
      <button class="btn btn-danger btn-sm">X</button>
    `;

    // delete exercice
    li.querySelector("button").addEventListener("click", async () => {
      await fetch(`/api/users/${user.id}`, { method: "DELETE" });
      loadUsers();
    });

    userList.appendChild(li);
  });
}

// Soumission du formulaire , manque incrmenter car autoIncrement pue la merde
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const firstname = firstnameInput.value.trim();

  if (!name || !firstname) return;

  await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: `${firstname} ${name}`
    })
  });

  form.reset();
  loadUsers();
});

// init
loadUsers();
