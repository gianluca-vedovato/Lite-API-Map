// Example usage of the lite-api npm package
import LiteAPI from "glcvdv-lite-api-map";
import '../src/style.css'

// Initialize the map
async function initMap() {
  try {
    const map = await LiteAPI.Map.init("#app", {
      liteApiApiKey: 'sand_5b1b26b5-f37a-4926-8896-ca1f64e1feb7',
      placeId: 'ChIJH991WiWufkcR_m10Kon2xRU',
      language: "EN",
      currency: "EUR",
      markerColor: "#ff6b6b",
      clusters: {
        maxZoom: 14,
        radius: 50,
        colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
      },
    });

    console.log(map)

    console.log("Map initialized successfully!");
  } catch (error) {
    console.error("Error initializing map:", error);
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", initMap);
