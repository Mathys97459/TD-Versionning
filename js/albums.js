let albums = [];

fetch("lib/albums.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors du chargement du fichier JSON");
        }
        return response.json();
    })
    .then((data) => {
        albums = data;
        refreshAlbums();
    })
    .catch((error) => {
        console.error(error);
    });

// Fonction pour générer les albums
const generateAlbums = () => {
    const container = document.getElementById("albumsContainer");
    container.innerHTML = "";
    const albumsInverted = [...albums].reverse(); 
    albumsInverted.forEach((album, index) => {
        const albumDiv = document.createElement("div");
        albumDiv.className = "col-md-12 mb-4";

        albumDiv.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${album.title}</h5>
          <p class="card-text"><strong>Date :</strong> ${album.date}</p>
          <p class="card-text"><strong>Accès :</strong> ${album.access.join(", ")}</p>
          <div class="photos">
            <h6>Photos :</h6>
            <ul class="list-unstyled">
              ${album.photos
                .map(
                    (photo) => `
                  <li class="d-flex flex-column align-items-start mb-2">
                    <img src="img/${photo.url}" alt="Photo" class="img-thumbnail me-2" style="width: 100px; height: 100px; object-fit: cover;">
                    <span>${photo.comments[0] || ""}</span>
                  </li>
                `
                )
                .join("")}
            </ul>
          </div>
          <div class="mt-3">
            <button class="btn btn-danger btn-sm me-2" onclick="deleteAlbum(${index})">Supprimer l'album</button>
            <button class="btn btn-primary btn-sm" onclick="addPhoto(${index})">Ajouter une photo</button>
          </div>
        </div>
      </div>
    `;
        container.appendChild(albumDiv);
    });
};

// Fonction pour supprimer un album
const deleteAlbum = (index) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet album ?")) {
        albums.splice(index, 1);
        refreshAlbums();
    }
};

// Fonction pour ajouter une photo
const addPhoto = (index) => {
    const photoUrl = prompt("Entrez l'URL de la photo :");
    const photoComment = prompt("Entrez un commentaire pour cette photo :");

    if (photoUrl) {
        albums[index].photos.push({
            url: photoUrl,
            comments: [photoComment || "Sans commentaire"],
        });
        refreshAlbums();
    }
};

// Fonction pour ajouter un album
const addAlbum = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const access = document.getElementById("access").value.split(",").map(person => person.trim());

    if (title && date && access.length > 0) {
        const newAlbum = {
            title: title,
            date: date,
            access: access,
            photos: []
        };

        albums.push(newAlbum);
        refreshAlbums();
    } else {
        alert("Veuillez remplir tous les champs.");
    }
};

// Fonction pour rafraîchir l'affichage des albums
const refreshAlbums = () => {
    window.deleteAlbum = deleteAlbum;
    window.addPhoto = addPhoto;
    generateAlbums();
};

// Ajouter un événement pour soumettre le formulaire d'ajout d'album
document.getElementById("albumForm").addEventListener("submit", addAlbum);

// Générer les albums au chargement
generateAlbums();
