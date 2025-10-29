"use strict";

// let darkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)").matches;

(() => {
  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return "dark";
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-bs-theme", theme);

    // Toggle the theme class on the body element
    document.body.classList.toggle("light-theme", theme === "light");
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector("#bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const svgOfActiveBtn = btnToActive
      .querySelector("svg use")
      .getAttribute("href");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    activeThemeIcon.setAttribute("href", svgOfActiveBtn);
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

    if (focus) {
      themeSwitcher.focus();
    }
  };

  // Removed browser preference auto-detection to keep dark mode as default
  // window
  //   .matchMedia("(prefers-color-scheme: dark)")
  //   .addEventListener("change", () => {
  //     const storedTheme = getStoredTheme();
  //     if (storedTheme !== "light" && storedTheme !== "dark") {
  //       setTheme(getPreferredTheme());
  //     }
  //   });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    });

    // Add event listener for the theme switch button
    const themeSwitchBtn = document.getElementById("themeSwitchBtn");
    themeSwitchBtn.addEventListener("click", () => {
      const currentTheme = getStoredTheme();
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setStoredTheme(newTheme);
      setTheme(newTheme);
      showActiveTheme(newTheme, true);
    });
  });
})();

// Add or remove the dark-icon class to icons
// const icons = document.querySelectorAll(".dark-icon");
// icons.forEach((icon) => {
//   if (darkModeEnabled) {
//     icon.classList.add("dark-icon");
//   } else {
//     icon.classList.remove("dark-icon");
//   }
// });

const header = document.querySelector(".navbar");

window.onscroll = function () {
  let top = window.scrollY;
  if (top >= 100) {
    header.classList.add("navbarTransparent");
  } else {
    header.classList.remove("navbarTransparent");
  }
};

const languages = [
  "Hello, it's me",
  "Olá, eu sou o",

];
const languageTextElement = document.getElementById("languageText");

let currentLanguageIndex = 0;
let typingInterval;

function typeNextCharacter () {
  const currentText = languages[currentLanguageIndex];
  let currentCharIndex = 0;

  function typeCharacter () {
    if (currentCharIndex < currentText.length) {
      languageTextElement.textContent += currentText.charAt(currentCharIndex);
      currentCharIndex++;
      setTimeout(typeCharacter, 100);
    } else {
      setTimeout(eraseText, 1000);
    }
  }

  typeCharacter();
}

function eraseText () {
  const currentText = languageTextElement.textContent;
  let currentCharIndex = currentText.length;

  function eraseCharacter () {
    if (currentCharIndex > 0) {
      languageTextElement.textContent = currentText.substring(
        0,
        currentCharIndex - 1
      );
      currentCharIndex--;
      setTimeout(eraseCharacter, 100);
    } else {
      setTimeout(nextLanguage, 1000);
    }
  }

  eraseCharacter();
}

function nextLanguage () {
  setTimeout(() => {
    currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
    languageTextElement.textContent = ""; // Clear the text
    languageTextElement.classList.remove("typed");
    typeNextCharacter();
  }, 10);
}

typeNextCharacter();

// Get references to the avatar elements
const avatar = document.getElementById("avatar");

// Get the URL of the glasses avatar image
const glassesAvatarSrc = "images/avatar2.jpeg";

// Get the original avatar image source
const originalAvatarSrc = avatar.src;

// Handle mouseover event (hover)
avatar.addEventListener("mouseover", () => {
  // Change the avatar image source to the one with glasses
  avatar.src = glassesAvatarSrc;
});

// Handle mouseout event (when not hovering)
avatar.addEventListener("mouseout", () => {
  // Change the avatar image source back to the original
  avatar.src = originalAvatarSrc;
});

// Smooth scroll for navigation links and close mobile menu when clicking a link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu after clicking a nav link
      const navbarCollapse = document.getElementById('navbarSupportedContent');
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse && window.innerWidth <= 991) {
        bsCollapse.hide();
      }
    }
  });
});

// Close mobile menu when clicking outside of it
document.addEventListener('click', function (event) {
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbar = document.querySelector('.navbar');

  // Check if the click is outside the navbar and the menu is open
  const isClickInsideNavbar = navbar.contains(event.target);
  const isMenuOpen = navbarCollapse.classList.contains('show');

  if (!isClickInsideNavbar && isMenuOpen && window.innerWidth <= 991) {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  }
});

// Add scroll reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});
