window.addEventListener("scroll", function () {
    const header = document.getElementById("SecHeader");
    if (window.scrollY > 50) {
        header.classList.add("nav-shrink");
    }
    else {
        header.classList.remove("nav-shrink");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const dropdownItem = document.querySelector('.nav-dropdown-item');
    const dropdownLink = dropdownItem ? dropdownItem.querySelector('a') : null;

    // 1. 漢堡選單開關
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');

            // 關閉大選單時收合子選單
            if (!navList.classList.contains('active') && dropdownItem) {
                dropdownItem.classList.remove('active');
            }
        });
    }

    // 2. 賽程下拉選單攔截 (點擊切換顯示)
    if (dropdownLink) {
        dropdownLink.addEventListener('click', function (e) {
            if (window.innerWidth <= 1199) {
                e.preventDefault();
                e.stopPropagation();
                dropdownItem.classList.toggle('active');
            }
        });
    }

    // 3. Scroll 效果
    window.addEventListener("scroll", function () {
        const header = document.getElementById("SecHeader");
        if (window.scrollY > 50) {
            header.classList.add("nav-shrink");
        } else {
            header.classList.remove("nav-shrink");
        }
    });
});