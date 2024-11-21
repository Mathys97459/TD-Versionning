// Chargement du fichier JSON avec les utilisateurs
let users = [];
fetch("lib/auth.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du fichier JSON");
    }
    return response.json();
  })
  .then((data) => {
    users = data;
  })
  .catch((error) => {
    console.error(error);
  });
// Gestion de la connexion
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Récupérer les champs du formulaire
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Vérifier les identifiants
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    window.location.href = "albums.html";
  } else {
    errorMsg.classList.remove("d-none");
  }
});
