gsap.registerPlugin(ScrollTrigger);

window.addEventListener("scroll", function () {
    const header = document.getElementById("mainHeader");
    if (window.scrollY > 50) {
        header.classList.add("nav-shrink");
    } 
    else {
        header.classList.remove("nav-shrink");
    }
});



gsap.from(".main-news-layout, .main-Title1-layout", {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.3,
    scrollTrigger: {
        
        trigger: ".main-news-layout",
        start: "top 80%",
        toggleActions: "play none none none",
    }

});

document.addEventListener('DOMContentLoaded', () => {

    const track = document.getElementById('carouselTrack');
    const originalSlides = document.querySelectorAll('.main-swiper-slide.original');
    const allSlides = document.querySelectorAll('.main-swiper-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationContainer = document.getElementById('paginationContainer');
    const container = document.getElementById('carouselContainer');

    let currentIndex = 2; 
    const LOGICAL_SLIDES = originalSlides.length;
    const PHYSICAL_SLIDES = allSlides.length;
    const SLIDE_WIDTH = 720; 
    const CONTAINER_WIDTH = container.clientWidth;


    function updateCarousel(isTeleporting = false) {
        
        const offset = (currentIndex * SLIDE_WIDTH) - (CONTAINER_WIDTH / 2) + (SLIDE_WIDTH / 2);
        
        track.style.transition = isTeleporting ? 'none' : 'transform 0.5s ease-in-out';
        
        track.style.transform = `translateX(${-offset}px)`;

        const logicalIndex = (currentIndex - 2 + LOGICAL_SLIDES) % LOGICAL_SLIDES; 

        allSlides.forEach((slide, index) => {
            slide.classList.remove('active');
            
            if (index === currentIndex) {
                slide.classList.add('active'); 
            }
        });
        
        updatePagination(logicalIndex);

        if (!isTeleporting) {
            if (currentIndex >= PHYSICAL_SLIDES - 2) { 
                setTimeout(() => {
                    currentIndex = 2; 
                    updateCarousel(true);
                }, 500); 
            } 
            else if (currentIndex <= 1) {
                setTimeout(() => {
                    currentIndex = LOGICAL_SLIDES + 1; 
                    updateCarousel(true);
                }, 500); 
            }
        }
    }


    function goToPrev() {
        currentIndex = currentIndex - 1;
        updateCarousel();
    }

    function goToNext() {
        currentIndex = currentIndex + 1;
        updateCarousel();
    }

    function createPagination() {
        paginationContainer.innerHTML = ''; 
        for (let i = 0; i < LOGICAL_SLIDES; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.index = i; 
            
            dot.addEventListener('click', () => {
                currentIndex = i + 2; 
                updateCarousel();
            });
            
            paginationContainer.appendChild(dot);
        }
    }

    function updatePagination(logicalIndex) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === logicalIndex) {
                dot.classList.add('active');
            }
        });
    }

    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);

    createPagination(); 
    updateCarousel(true);
});