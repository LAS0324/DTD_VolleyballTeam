window.addEventListener("scroll", function () {
    const header = document.getElementById("SecHeader");
    if (window.scrollY > 50) {
        header.classList.add("nav-shrink");
    } 
    else {
        header.classList.remove("nav-shrink");
    }
});

