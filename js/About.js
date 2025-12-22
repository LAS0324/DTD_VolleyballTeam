window.addEventListener("scroll", function () {
    const header = document.getElementById("SecHeader");
    if (window.scrollY > 50) {
        header.classList.add("nav-shrink");
    } 
    else {
        header.classList.remove("nav-shrink");
    }
});

// 1. 註冊外掛 (如果你之前沒註冊過)
gsap.registerPlugin(ScrollTrigger);

// 2. 定義需要「捲動觸發 + 內部排隊」效果的區塊類別
const sequenceClasses = [
    ".main-TeamIntro-layout", 
    ".main-PracTime-layout"
    // 如果未來有新增區塊，直接在這邊加入 class 名稱即可
];

// 3. 執行遍歷動畫邏輯
sequenceClasses.forEach((selector) => {
    // 抓取頁面上所有符合該類別的容器 (考慮到 RWD 可能會有重複類別)
    const containers = gsap.utils.toArray(selector);

    containers.forEach((container) => {
        // 選取容器內的所有「直接子元素」
        // 若想更精確可以改用 container.querySelectorAll("h2, p, img, .item")
        const children = container.children;

        // 如果容器內沒有子元素則跳過，避免報錯
        if (children.length > 0) {
            gsap.from(children, {
                duration: 0.8,        // 動畫持續 1 秒
                y: 50,              // 從下方 50px 位移
                opacity: 0,         // 從透明度 0 開始
                scale: 0.95,        // 稍微縮小，增加彈出感
                stagger: 0.2,       // 每個子元素之間間隔 0.2 秒出現
                ease: "power2.out", // 平滑的減速曲線
                scrollTrigger: {
                    trigger: container,    // 以該區塊容器作為觸發目標
                    start: "top 85%",      // 當容器頂部到達視窗下方 85% 位置時觸發
                    toggleActions: "play none none reverse", // 進入播放，離開回滾(可選)
                    // markers: true,      // 開發期間可開啟，確認觸發位置
                }
            });
        }
    });
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
            
            // 關閉漢堡選單時，順便收起下拉選單
            if (!navList.classList.contains('active') && dropdownItem) {
                dropdownItem.classList.remove('active');
            }
        });
    }

    // 2. 賽程下拉選單攔截 (針對平板與手機)
    if (dropdownLink) {
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 1199) {
                e.preventDefault();
                e.stopPropagation();
                dropdownItem.classList.toggle('active');
            }
        });
    }

    // 3. 原有的 Scroll 縮小效果
    window.addEventListener("scroll", function () {
        const header = document.getElementById("SecHeader");
        if (window.scrollY > 50) {
            header.classList.add("nav-shrink");
        } else {
            header.classList.remove("nav-shrink");
        }
    });
});