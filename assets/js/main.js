document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const pageName = document.body.dataset.page;

  // Mobile navigation öffnen / schließen
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen.toString());
    });
  }

  // Schließe das mobile Menü beim Klick auf einen Link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (siteNav.classList.contains("open")) {
        siteNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Aktiven Navigationslink markieren
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `${pageName}.html` || (pageName === "index" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // Scroll-Animationen mit IntersectionObserver
  const observerOptions = {
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((section) => {
    observer.observe(section);
  });

  // Tarif-Umschalter auf der Tarifrechner-Seite
  const planButtons = document.querySelectorAll(".plan-toggle button");
  const tariffTypeInput = document.querySelector("#tarif-type");
  if (planButtons.length && tariffTypeInput) {
    planButtons.forEach((button) => {
      button.addEventListener("click", () => {
        planButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        tariffTypeInput.value = button.dataset.value;
      });
    });
  }

  // Formulare verarbeiten und Erfolgsnachricht anzeigen
  document.querySelectorAll("form").forEach((form) => {
    const successMessage = form.querySelector(".form-success");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (successMessage) {
        // Prüfe, ob es eine Tarifprüfung ist
        if (document.body.dataset.page === "tarifpruefung") {
          successMessage.textContent = "Danke! Ihre Anfrage wurde vorbereitet. Strompreis24 wird sich mit Ihnen in Verbindung setzen.";
        } else {
          successMessage.textContent = "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich bei Ihnen.";
        }
        successMessage.style.display = "block";
      }
      form.reset();
      if (tariffTypeInput) {
        tariffTypeInput.value = "strom";
        const activeButton = document.querySelector(".plan-toggle button[data-value='strom']");
        if (activeButton) {
          planButtons.forEach((item) => item.classList.remove("active"));
          activeButton.classList.add("active");
        }
      }
    });
  });
});
