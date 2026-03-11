
window.onscroll = function () {
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  };
  
  // Remonte en haut quand on clique
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  // Effet de fade-in au chargement
window.addEventListener("load", () => {
    document.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("loaded");
    });
  });
  
  window.addEventListener("scroll", () => {
    const bars = document.querySelectorAll(".bar > div");
    bars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0"; // reset
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }, { once: true });
  
  
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target); // déclenche qu’une fois
      }
    });
  });
  
  document.querySelectorAll(".reveal-on-scroll").forEach(el => {
    observer.observe(el);
  });
  
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const MIN_DISPLAY_TIME = 2000;
    const startTime = Date.now();
  
    window.addEventListener("load", () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(MIN_DISPLAY_TIME - elapsedTime, 0);
  
      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
  
        setTimeout(() => {
          loadingScreen.style.display = "none";
  
          // 🔥 Lancer l'animation après le loader
          document.querySelector(".typewriter")?.classList.add("start-typewriter");
          document.querySelectorAll(".fade-in").forEach(el => el.classList.add("loaded"));
        }, 1000); // Temps de transition CSS
      }, remainingTime);
    });
  });
  
  document.addEventListener("mousemove", function(e) {
    const particlesContainer = document.getElementById("particles-js");
  
    if (particlesContainer) {
      const x = (e.clientX / window.innerWidth - 0.5) * 10; // Ajuste la force ici
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
  
      particlesContainer.style.transform = `translate(${x}px, ${y}px)`;
    }
  });




 const toggleBtn = document.getElementById("theme-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggleBtn.textContent = document.body.classList.contains("light-mode")
      ? "Mode sombre"
      : "Mode clair";
  });

 
document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".typewriter-text");
  const phrases = JSON.parse(element.getAttribute("data-phrases"));
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    const displayedText = isDeleting 
      ? currentPhrase.substring(0, charIndex--) 
      : currentPhrase.substring(0, charIndex++);

    element.textContent = displayedText;

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 1500; // pause avant suppression
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 300;
    }

    setTimeout(type, delay);
  }

  type(); // lancer l'effet dès le départ
});


 


