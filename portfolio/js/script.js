
window.addEventListener("load", revealSections);
window.addEventListener("scroll", revealSections);

function revealSections() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(function(section) {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            section.classList.add("active");
        }
    });
}