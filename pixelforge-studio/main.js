const siteHeader = document.querySelector(".header-inner");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const mobileNavigationQuery = window.matchMedia("(max-width: 54rem)");

// Set this to the public endpoint from your Formspree form.
const FORM_ENDPOINT = "https://formspree.io/f/mqpqqlrz";

function syncNavigation() {
  const isMobile = mobileNavigationQuery.matches;

  menuToggle.hidden = !isMobile;
  menuToggle.setAttribute("aria-expanded", "false");
  primaryNavigation.hidden = isMobile;
}

if (siteHeader && menuToggle && primaryNavigation) {
  siteHeader.dataset.menuReady = "";
  syncNavigation();

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Открыть меню" : "Закрыть меню",
    );
    primaryNavigation.hidden = isOpen;
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a") && mobileNavigationQuery.matches) {
      primaryNavigation.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileNavigationQuery.matches &&
      !primaryNavigation.hidden
    ) {
      primaryNavigation.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
      menuToggle.focus();
    }
  });

  mobileNavigationQuery.addEventListener("change", syncNavigation);
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const formNote = document.querySelector("#form-note");
const submitButton = contactForm
  ? contactForm.querySelector('button[type="submit"]')
  : null;

if (formNote) {
  formNote.textContent = FORM_ENDPOINT
    ? "Заявки будут отправляться на указанный endpoint Formspree."
    : "Отправка не настроена: укажите endpoint Formspree в FORM_ENDPOINT в main.js.";
}

if (contactForm && formStatus && submitButton) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (contactForm.getAttribute("aria-busy") === "true") {
      return;
    }

    formStatus.textContent = "";
    formStatus.dataset.state = "";

    if (!contactForm.reportValidity()) {
      formStatus.dataset.state = "error";
      formStatus.textContent = "Проверьте обязательные поля и попробуйте ещё раз.";
      return;
    }

    if (!FORM_ENDPOINT.trim()) {
      formStatus.dataset.state = "error";
      formStatus.textContent =
        "Форма пока не подключена. Укажите endpoint Formspree в FORM_ENDPOINT в main.js.";
      return;
    }

    submitButton.disabled = true;
    contactForm.setAttribute("aria-busy", "true");
    formStatus.dataset.state = "loading";
    formStatus.textContent = "Отправляем заявку...";

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(contactForm),
      });

      if (!response.ok) {
        throw new Error(`Formspree returned HTTP ${response.status}.`);
      }

      contactForm.reset();
      formStatus.dataset.state = "success";
      formStatus.textContent =
        "Заявка отправлена. Спасибо! Я свяжусь с вами по указанной почте.";
    } catch (error) {
      console.error("Formspree form submission failed:", error);
      formStatus.dataset.state = "error";
      formStatus.textContent =
        "Не удалось отправить заявку. Проверьте подключение и попробуйте ещё раз.";
    } finally {
      contactForm.removeAttribute("aria-busy");
      submitButton.disabled = false;
    }
  });
}
