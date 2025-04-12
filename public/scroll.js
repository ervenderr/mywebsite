// This script ensures smooth scrolling to sections when navigation links are clicked
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Get the header height to adjust scroll position
        const headerHeight = document.querySelector("header").offsetHeight

        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: "smooth",
        })
      }
    })
  })
})
