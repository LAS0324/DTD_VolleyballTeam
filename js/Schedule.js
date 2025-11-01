window.addEventListener("scroll", function () {
    const header = document.getElementById("SecHeader");
    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } 
    else {
        header.classList.remove("shrink");
    }
});

// const Change = document.querySelector(".main-score-background");
// const Week1 = document.querySelector(".main-Schedule-week1");
// const NewText = document.createElement("p");

// Change.addEventListener("click", function(){
//     Change.classList.remove("");
// });