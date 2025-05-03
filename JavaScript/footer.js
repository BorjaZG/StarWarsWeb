document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("main-footer");
    if (!footer) return;

    // Por defecto se oculta
    footer.classList.add("hidden");

    // Esperamos a que toda la página cargue (incluido JS y fetchs)
    window.addEventListener("load", () => {
      // Añade un pequeño delay
        setTimeout(() => {
            footer.classList.remove("hidden");
            }, 15000); // 15 segundos de delay
        });
});