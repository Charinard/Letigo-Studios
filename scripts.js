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





// ---- Stuff for session musician scrolling shit ----


 const gallery = document.querySelector('.musicians-gallery');

if (gallery) {
  // Just basic scroll functionality, no cloning or loop resets

  // Optional: You can add any custom behavior on scroll here, 
  // but for now, it just lets the user scroll freely.
  gallery.addEventListener('scroll', () => {
    // You can add things like lazy loading or animations here if desired.
  });
}




// ---- Function for A/B buttons on sample players ----

document.querySelectorAll('.sample-player').forEach(player => {
  const audioA = new Audio(player.dataset.audioA);
  const audioB = new Audio(player.dataset.audioB);

  let current = audioA;

  const playBtn = player.querySelector('.play-pause');
  const btnA = player.querySelector('.switch-a');
  const btnB = player.querySelector('.switch-b');
  const progressBar = player.querySelector('.progress-bar');
  const progress = player.querySelector('.progress');

  // Play/Pause logic
  playBtn.addEventListener('click', () => {
    if (current.paused) {
      current.play();
      playBtn.textContent = '⏸';
    } else {
      current.pause();
      playBtn.textContent = '▶';
    }
  });

  // Update progress bar
  function updateProgress() {
    progress.style.width = (current.currentTime / current.duration) * 100 + '%';
  }
  audioA.addEventListener('timeupdate', updateProgress);
  audioB.addEventListener('timeupdate', updateProgress);

  // Click to seek
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioA.currentTime = percent * audioA.duration;
    audioB.currentTime = percent * audioB.duration;
  });

  // Switch to Mix A
  btnA.addEventListener('click', () => {
    if (current === audioA) return;
    const time = current.currentTime;
    const wasPlaying = !current.paused;
    current.pause();
    audioA.currentTime = time;
    current = audioA;
    if (wasPlaying) current.play();
    btnA.classList.add('active');
    btnB.classList.remove('active');
  });

  // Switch to Mix B
  btnB.addEventListener('click', () => {
    if (current === audioB) return;
    const time = current.currentTime;
    const wasPlaying = !current.paused;
    current.pause();
    audioB.currentTime = time;
    current = audioB;
    if (wasPlaying) current.play();
    btnB.classList.add('active');
    btnA.classList.remove('active');
  });
});
