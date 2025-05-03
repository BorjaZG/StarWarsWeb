document.addEventListener("DOMContentLoaded", () => {
  const API_STARSHIPS = "https://www.swapi.tech/api/starships";
  const starshipContainer = document.getElementById("starships-list");
  const loadingStarships = document.getElementById("loading-starships");

  async function fetchStarships() {
    try {
      const res = await fetch(API_STARSHIPS);
      const data = await res.json();
      const ships = data.results;

      const detailedShips = await Promise.all(
        ships.map(async (ship) => {
          const res = await fetch(ship.url);
          const data = await res.json();
          return data.result.properties;
        })
      );

      renderStarships(detailedShips);
    } catch (error) {
      console.error("Error al cargar naves:", error);
      if (loadingStarships) {
        loadingStarships.textContent = "Hubo un error al cargar las naves.";
      }
    }
  }

  function renderStarships(list) {
    if (loadingStarships) loadingStarships.style.display = "none";
    starshipContainer.innerHTML = "";

    list.forEach((ship) => {
      const card = document.createElement("div");
      card.className = "card";

      // Imagen local generada por nombre
      const imageFileName = ship.name
        .toLowerCase()
        .replace(/[\s\-]/g, "_")
        .replace(/[^\w_]/g, "") + ".jpg";

      const imageUrl = `Imágenes/naves/${imageFileName}`;

      card.innerHTML = `
        <div class="image-wrapper">
          <img src="${imageUrl}" alt="${ship.name}" class="card-image" onerror="this.style.display='none'" />
        </div>
        <h3>${ship.name}</h3>
        <p><strong>Modelo:</strong> ${ship.model}</p>
        <p><strong>Fabricante:</strong> ${ship.manufacturer}</p>
        <p><strong>Clase:</strong> ${ship.starship_class}</p>
      `;

      starshipContainer.appendChild(card);
    });
  }

  fetchStarships();
});