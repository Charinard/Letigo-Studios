// ---- Console Load Log ----
console.log("Letigo Studios site loaded.");

// ---- Calendly Inline Widget ----
document.addEventListener("DOMContentLoaded", function () {
  const calendlyContainer = document.getElementById("calendly-inline-widget");
  if (calendlyContainer) {
    Calendly.initInlineWidget({
      url: "https://calendly.com/letigorecordings/recording-session",
      parentElement: calendlyContainer,
      prefill: {},
      utm: {}
    });
  }
});

// ---- Unsplash Background Hero Image ----
fetch("https://source.unsplash.com/random/1600x900/?studio,music")
  .then((response) => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.style.backgroundImage = `url(${response.url})`;
    }
  })
  .catch((error) => {
    console.error("Error fetching Unsplash image:", error);
  });

// ---- Fun Quote of the Day API ----
fetch("https://api.quotable.io/random")
  .then((response) => response.json())
  .then((data) => {
    const quoteContainer = document.getElementById("quote-of-the-day");
    if (quoteContainer) {
      quoteContainer.innerText = `"${data.content}" – ${data.author}`;
    }
  })
  .catch((error) => {
    console.error("Error fetching quote:", error);
  });

// ---- Weather (Open-Meteo API) for Local Feel ----
fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=42.36&longitude=-71.06&current_weather=true"
)
  .then((response) => response.json())
  .then((data) => {
    const weather = data.current_weather;
    const weatherContainer = document.getElementById("weather");
    if (weatherContainer) {
      weatherContainer.innerText = `Currently ${weather.temperature}°C and ${weather.weathercode}`;
    }
  })
  .catch((error) => {
    console.error("Error fetching weather:", error);
  });

// ---- IPify API for Client IP Display (Optional Fun) ----
fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    const ipContainer = document.getElementById("ip-address");
    if (ipContainer) {
      ipContainer.innerText = `You're visiting from IP: ${data.ip}`;
    }
  })
  .catch((error) => {
    console.error("Error fetching IP address:", error);
  });
