// Get variables for the change theme button, banner, and what os theme the user prefers
const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
// Initialise variable that tracks the current theme used
var theme = null;

// Function to set cooldown for theme button to prevent spamming
function enableCooldown(button, duration) {
    button.disabled = true;

    setTimeout(() => {
        button.disabled = false;
    }, duration);
}

// If the user has not accessed the site before, set "theme" to the os theme
if (localStorage.getItem("theme") == null) {
    theme = prefersDarkScheme.matches ? "dark" : "light";
    // Save to localStorage
    localStorage.setItem("theme", theme);
} else {
    // Else, get the saved theme from local storage
    theme = localStorage.getItem("theme");
}

// Get the theme that is set at the beginning of opening the site
const startTheme = localStorage.getItem("theme");

// Switch the themes if the os theme is different to the user's preferred site theme
if (prefersDarkScheme.matches && startTheme === "light") {
    document.body.classList.toggle("light-theme");
    document.getElementById("themeicon").src = "images/light-mode-icon.png";
} else if (!prefersDarkScheme.matches && startTheme === "dark") {
    document.body.classList.toggle("dark-theme");
}

// When change theme button is clicked, switch the theme
btn.addEventListener("click", function () {
    enableCooldown(btn, 750);
    if (prefersDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
    } else {
        document.body.classList.toggle("dark-theme");
    }
    theme = theme === "dark" ? "light" : "dark";
    document.getElementById("themeicon").src = `images/${theme}-mode-icon.png`;
    // Save the current them to localStorage
    localStorage.setItem("theme", theme);
});

