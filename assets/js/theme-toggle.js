const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    themeToggle.textContent = newTheme === "light" ? "Dark Mode" : "Light Mode";

    const elements = document.querySelectorAll(".light-background, .dark-background");
    elements.forEach(element => {
      if (newTheme === "dark") {
        element.classList.add("dark-background");
        element.classList.remove("light-background");
      } else {
        element.classList.add("light-background");
        element.classList.remove("dark-background");
      }
    });
  });

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "light" ? "Dark Mode" : "Light Mode";
}
