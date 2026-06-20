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
(function () {
  const funnelRoot = document.getElementById('energyFunnel');
  if (!funnelRoot) return;

  const content = document.getElementById('funnelContent');
  const form = document.getElementById('funnelForm');
  const startButton = document.getElementById('funnelStart');
  const nav = funnelRoot.querySelector('.funnel-nav');
  const backButton = document.getElementById('funnelBack');
  const nextButton = document.getElementById('funnelNext');
  const progressTop = funnelRoot.querySelector('.funnel-progress-top');
  const stepLabel = document.getElementById('funnelStepLabel');
  const progressBar = document.getElementById('funnelProgressBar');
  const summaryBox = document.getElementById('funnelSummaryBox');
  const summaryList = document.getElementById('funnelSummaryList');

  const steps = [
    {
      key: 'energy',
      title: 'Welche Vertragsart soll geprüft werden?',
      text: 'Wählen Sie aus, ob es um Strom, Gas oder beides geht.',
      type: 'options',
      options: [
        ['Strom', 'Gewerbestrom oder Industriestrom prüfen'],
        ['Gas', 'Gewerbegasvertrag prüfen'],
        ['Strom & Gas', 'Beide Verträge gemeinsam prüfen'],
        ['Noch unsicher', 'Ich möchte mich beraten lassen']
      ]
    },
    {
      key: 'customerType',
      title: 'Für welche Art Unternehmen ist die Anfrage?',
      text: 'Damit wir Ihre Anfrage besser einschätzen können.',
      type: 'options',
      options: [
        ['Gewerbe', 'Kleines oder mittleres Unternehmen'],
        ['Industrie', 'Höherer Verbrauch oder mehrere Anlagen'],
        ['Immobilienverwaltung', 'Objekte, Standorte oder Allgemeinstrom'],
        ['Filialunternehmen', 'Mehrere Standorte oder Zähler']
      ]
    },
    {
      key: 'consumption',
      title: 'Wie hoch ist Ihr ungefährer Verbrauch?',
      text: 'Eine grobe Einschätzung reicht aus.',
      type: 'options',
      options: [
        ['Unter 30.000 kWh/Jahr', 'Kleinerer Gewerbeverbrauch'],
        ['30.000–100.000 kWh/Jahr', 'Typischer B2B-Verbrauch'],
        ['Über 100.000 kWh/Jahr', 'Größerer Gewerbe- oder Industriekunde'],
        ['Nicht bekannt', 'Ich reiche die Daten später nach']
      ]
    },
    {
      key: 'contractStatus',
      title: 'Wie ist der aktuelle Vertragsstatus?',
      text: 'Diese Info hilft bei Laufzeit, Kündigung und Wechselmöglichkeit.',
      type: 'options',
      options: [
        ['Läuft noch länger als 6 Monate', 'Prüfung für spätere Optimierung'],
        ['Läuft in den nächsten 6 Monaten aus', 'Wechsel kann vorbereitet werden'],
        ['Bereits gekündigt', 'Schnelle Prüfung sinnvoll'],
        ['Ich weiß es nicht', 'Wir prüfen es gemeinsam']
      ]
    },
    {
      key: 'contact',
      title: 'Wie erreichen wir Sie?',
      text: 'Ihre Anfrage wird persönlich geprüft. Pflichtfelder sind markiert.',
      type: 'fields'
    },
    {
      key: 'review',
      title: 'Angaben prüfen und Anfrage absenden',
      text: 'Bitte prüfen Sie Ihre Angaben. Die Anfrage ist kostenlos und unverbindlich.',
      type: 'review'
    }
  ];

  let currentStep = -1;
  const answers = {};

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[char];
    });
  }

  function renderStep() {
    const step = steps[currentStep];

    stepLabel.textContent = 'Schritt ' + (currentStep + 1) + ' von ' + steps.length;
    progressBar.style.width = (((currentStep + 1) / steps.length) * 100) + '%';

    backButton.disabled = currentStep === 0;
    nextButton.textContent = currentStep === steps.length - 1 ? 'Anfrage absenden' : 'Weiter';

    let html = '<h1>' + escapeHtml(step.title) + '</h1>';
    html += '<p>' + escapeHtml(step.text) + '</p>';

    if (step.type === 'options') {
      html += '<div class="funnel-options">';
      html += step.options.map(function (option) {
        const selected = answers[step.key] === option[0] ? ' is-selected' : '';

        return (
          '<button type="button" class="funnel-option' + selected + '" data-answer="' + escapeHtml(option[0]) + '">' +
            '<strong>' + escapeHtml(option[0]) + '</strong>' +
            '<span>' + escapeHtml(option[1]) + '</span>' +
          '</button>'
        );
      }).join('');
      html += '</div>';
    }

    if (step.type === 'fields') {
      html += '<div class="funnel-fields">';
      html += field('company', 'Firma / Unternehmen *', 'text');
      html += field('name', 'Ansprechpartner *', 'text');
      html += field('phone', 'Telefon *', 'tel');
      html += field('email', 'E-Mail *', 'email');
      html += field('provider', 'Aktueller Anbieter', 'text');
      html += field('postalCode', 'PLZ / Standort', 'text');
      html += `
        <div class="funnel-field full">
          <label for="message">Zusätzliche Hinweise</label>
          <textarea id="message" name="message" placeholder="z. B. mehrere Zähler, Kündigungsfrist, besondere Anforderungen">${escapeHtml(answers.message || '')}</textarea>
        </div>
      `;
      html += '</div>';
    }

    if (step.type === 'review') {
      html += '<div class="summary-list">';
      Object.keys(getSummaryData()).forEach(function (label) {
        html += '<div class="summary-item">';
        html += '<strong>' + escapeHtml(label) + '</strong>';
        html += '<span>' + escapeHtml(getSummaryData()[label]) + '</span>';
        html += '</div>';
      });
      html += '</div>';

      html += `
        <label class="funnel-check">
          <input type="checkbox" id="privacy" ${answers.privacy ? 'checked' : ''}>
          <span>
            Ich stimme zu, dass Strompreis24 meine Angaben zur Bearbeitung der Anfrage nutzen darf.
            Die Hinweise zum Datenschutz habe ich gelesen.
          </span>
        </label>

        <div class="funnel-success" hidden id="funnelSuccess">
          <strong>Danke!</strong><br>
          Ihre Anfrage wurde vorbereitet. Im nächsten Schritt können wir sie an E-Mail, Formspree, PHP oder das CRM anbinden.
        </div>
      `;
    }

    html += '<div class="funnel-error" id="funnelError"></div>';

    content.innerHTML = html;

    bindStepEvents();
    updateSummary();
  }

  function field(name, label, type) {
    return `
      <div class="funnel-field">
        <label for="${name}">${label}</label>
        <input id="${name}" name="${name}" type="${type}" value="${escapeHtml(answers[name] || '')}">
      </div>
    `;
  }

  function bindStepEvents() {
    content.querySelectorAll('.funnel-option').forEach(function (button) {
      button.addEventListener('click', function () {
        answers[steps[currentStep].key] = button.dataset.answer;
        renderStep();
      });
    });

    content.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.type === 'checkbox') {
          answers[input.id] = input.checked;
        } else {
          answers[input.name] = input.value.trim();
        }

        updateSummary();
      });

      input.addEventListener('change', function () {
        if (input.type === 'checkbox') {
          answers[input.id] = input.checked;
        }
      });
    });
  }

  function getSummaryData() {
    return {
      'Vertragsart': answers.energy || 'Noch nicht ausgewählt',
      'Kundentyp': answers.customerType || 'Noch nicht ausgewählt',
      'Verbrauch': answers.consumption || 'Noch nicht ausgewählt',
      'Vertragsstatus': answers.contractStatus || 'Noch nicht ausgewählt',
      'Firma': answers.company || 'Noch nicht angegeben',
      'Ansprechpartner': answers.name || 'Noch nicht angegeben',
      'Telefon': answers.phone || 'Noch nicht angegeben',
      'E-Mail': answers.email || 'Noch nicht angegeben'
    };
  }

  function updateSummary() {
    if (currentStep < 0 || !summaryBox || !summaryList) return;

    summaryBox.querySelector('h2').textContent = 'Ihre Anfrage';

    const data = getSummaryData();
    const visibleItems = currentStep < 4 ? 4 : 8;

    summaryList.innerHTML = Object.keys(data).slice(0, visibleItems).map(function (label) {
      return (
        '<div class="summary-item">' +
          '<strong>' + escapeHtml(label) + '</strong>' +
          '<span>' + escapeHtml(data[label]) + '</span>' +
        '</div>'
      );
    }).join('');
  }

  function showError(message) {
    const error = document.getElementById('funnelError');
    if (!error) return;

    error.textContent = message;
    error.classList.add('is-visible');
  }

  function validateCurrentStep() {
    const step = steps[currentStep];

    if (step.type === 'options' && !answers[step.key]) {
      showError('Bitte wählen Sie eine Antwort aus.');
      return false;
    }

    if (step.type === 'fields') {
      ['company', 'name', 'phone', 'email'].forEach(function (name) {
        const input = document.getElementById(name);
        if (input) answers[name] = input.value.trim();
      });

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email || '');

      if (!answers.company || !answers.name || !answers.phone || !answers.email) {
        showError('Bitte füllen Sie alle Pflichtfelder aus.');
        return false;
      }

      if (!emailOk) {
        showError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return false;
      }
    }

    if (step.type === 'review' && !answers.privacy) {
      showError('Bitte stimmen Sie der Datenschutzhinweis-Bestätigung zu.');
      return false;
    }

    return true;
  }

  function startFunnel() {
    currentStep = 0;
    progressTop.hidden = false;
    nav.hidden = false;
    renderStep();
  }

  function submitFunnel() {
    const success = document.getElementById('funnelSuccess');

    if (success) {
      success.hidden = false;
    }

    nextButton.disabled = true;
    backButton.disabled = true;

    console.log('Strompreis24 Lead:', JSON.stringify(answers, null, 2));
  }

  if (startButton) {
    startButton.addEventListener('click', startFunnel);
  }

  if (backButton) {
    backButton.addEventListener('click', function () {
      if (currentStep > 0) {
        currentStep -= 1;
        renderStep();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      if (!validateCurrentStep()) return;

      if (currentStep === steps.length - 1) {
        submitFunnel();
      } else {
        currentStep += 1;
        renderStep();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  }
})();