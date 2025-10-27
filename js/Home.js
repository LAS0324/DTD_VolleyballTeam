window.addEventListener("scroll", function () {
    const header = document.getElementById("mainHeader");
    if (window.scrollY > 50) {
        header.classList.add("nav-shrink");
    } 
    else {
        header.classList.remove("nav-shrink");
    }
});

