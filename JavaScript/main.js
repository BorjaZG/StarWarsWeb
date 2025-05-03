const API_URL = "https://www.swapi.tech/api/people";
const container = document.getElementById("characters-list");
const searchInput = document.getElementById("search");
const loadingText = document.getElementById("loading");

let allCharacters = [];

async function fetchCharacters() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const characters = data.results;

    const detailedCharacters = await Promise.all(
      characters.map(async (char) => {
        const res = await fetch(char.url);
        const data = await res.json();
        const props = data.result.properties;

        return {
          id: char.uid,
          name: props.name,
          height: props.height,
          mass: props.mass,
          gender: props.gender,
        };
      })
    );

    allCharacters = detailedCharacters;
    renderCharacters(allCharacters);
  } catch (error) {
    console.error("Error al cargar personajes:", error);
    loadingText.textContent = "Hubo un error al cargar los personajes.";
  }
}

function renderCharacters(list) {
  if (loadingText) loadingText.style.display = "none";
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p style='text-align: center; font-size: 1.2rem;'>No se encontraron personajes.</p>";
    return;
  }

  list.forEach((char) => {
    const card = document.createElement("div");
    card.className = "card";

    const imageFileName = char.name
      .toLowerCase()
      .replace(/[\s\-]/g, "_")
      .replace(/[^\w_]/g, "") + ".jpg";

    const imageUrl = `Imágenes/personajes/${imageFileName}`;

    card.innerHTML = `
      <div class="image-wrapper"><img src="${imageUrl}" alt="${char.name}" class="card-image" onerror="this.style.display='none'" /></div>
      <h3>${char.name}</h3>
      <p><strong>Altura:</strong> ${char.height} cm</p>
      <p><strong>Peso:</strong> ${char.mass} kg</p>
      <p><strong>Género:</strong> ${char.gender}</p>
    `;

    card.addEventListener("click", () => {
      window.location.href = `detalle.html?id=${char.id}`;
    });

    container.appendChild(card);
  });
}

// Buscador
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = allCharacters.filter((char) =>
    char.name.toLowerCase().includes(value)
  );
  renderCharacters(filtered);
});

fetchCharacters();