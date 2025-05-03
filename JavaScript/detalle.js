const container = document.getElementById("character-detail");
const loading = document.getElementById("loading");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  container.innerHTML = "<p>ID no válido.</p>";
} else {
  fetchCharacter(id);
}

async function fetchCharacter(id) {
  try {
    const res = await fetch(`https://www.swapi.tech/api/people/${id}`);
    const data = await res.json();
    const char = data.result.properties;

    const planetRes = await fetch(char.homeworld);
    const planetData = await planetRes.json();
    const planetName = planetData.result.properties.name;

    renderCharacter(char, planetName);
  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = "<p>Error al cargar el personaje.</p>";
  }
}

function renderCharacter(char, planetName) {
  loading.style.display = "none";

  // Ruta a imagen local
  const imageFileName = char.name
    .toLowerCase()
    .replace(/[\s\-]/g, "_")
    .replace(/[^\w_]/g, "") + ".jpg";

  const imageUrl = `Imágenes/personajes/${imageFileName}`;
  container.innerHTML = `
    <div class="character-card">
      <img src="${imageUrl}" alt="${char.name}" class="character-image" onerror="this.style.display='none'" />

      <div class="character-info">
        <h2>${char.name}</h2>
        <p><strong>Altura:</strong> ${char.height} cm</p>
        <p><strong>Peso:</strong> ${char.mass} kg</p>
        <p><strong>Género:</strong> ${char.gender}</p>
        <p><strong>Nacimiento:</strong> ${char.birth_year}</p>
        <p><strong>Color de piel:</strong> ${char.skin_color}</p>
        <p><strong>Color de ojos:</strong> ${char.eye_color}</p>
        <p><strong>Color de cabello:</strong> ${char.hair_color}</p>
        <p><strong>Planeta natal:</strong> ${planetName}</p>
      </div>
    </div>
  `;
}