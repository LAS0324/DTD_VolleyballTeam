window.addEventListener("scroll", function () {
    const header = document.getElementById("SecHeader");
    if (window.scrollY > 50) {
        header.classList.add("nav-shrink");
    }
    else {
        header.classList.remove("nav-shrink");
    }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAsFfBgCdKgvkbDHOEB-qMMCQpJ29spaVg",
    authDomain: "webdesign-79b38.firebaseapp.com",
    projectId: "webdesign-79b38",
    storageBucket: "webdesign-79b38.firebasestorage.app",
    messagingSenderId: "432214898368",
    appId: "1:432214898368:web:9c9bdf71a9df42e0059f25",
    measurementId: "G-L16053KJ53"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 1. 監聽比分看板 (讀取 match_stats 文件)
const infoRef = doc(db, "Player_stats", "match_stats");
onSnapshot(infoRef, (docSnap) => {
    const banner = document.getElementById('scoreBanner');
    if (docSnap.exists()) {
        const data = docSnap.data();
        if (banner) banner.style.display = 'flex';
        document.getElementById('finalScore').innerText = `${data.home_score} : ${data.away_score}`;
        document.getElementById('opponentName').innerText = data.opponent || "自然";
    }
});

// 2. 監聽球員數據
const playerRef = collection(db, "Player_stats");
onSnapshot(query(playerRef, orderBy("number", "asc")), (snapshot) => {
    const tableBody = document.getElementById('allStatsBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    let allPlayerData = [];

    snapshot.forEach((doc) => {
        if (doc.id !== "match_stats") {
            const d = doc.data();
            allPlayerData.push(d);

            // 嚴格對照你給的 14 個欄位名稱
            tableBody.innerHTML += `
                <tr>
                    <td>${d.number || 0}</td>
                    <td><strong>${d.name || ''}</strong></td>
                    <td>${d.position || ''}</td>
                    <td>${d.atk_total || 0}</td>
                    <td>${d.atk_kill || 0}</td>
                    <td>${d.atk_err || 0}</td>
                    <td>${d.ser_ace || 0}</td>
                    <td>${d.ser_err || 0}</td>
                    <td>${d.rec_total || 0}</td>
                    <td>${d.rec_excellent || 0}</td>
                    <td>${d.rec_err || 0}</td>
                    <td>${d.set_total || 0}</td>
                    <td>${d.set_adj || 0}</td>
                    <td>${d.set_err || 0}</td>
                </tr>`;
        }
    });
    renderRankings(allPlayerData);
});

// 排行榜渲染
function renderRankings(data) {
    if (!data || data.length === 0) return;

    // 分別傳入對應的欄位名稱進行排序
    displayRank('topPoints', [...data].sort((a, b) => (b.atk_kill || 0) - (a.atk_kill || 0)).slice(0, 3), 'atk_kill', '分');
    displayRank('topAces', [...data].sort((a, b) => (b.ser_ace || 0) - (a.ser_ace || 0)).slice(0, 3), 'ser_ace', 'Ace');
    displayRank('topDefense', [...data].sort((a, b) => (b.rec_excellent || 0) - (a.rec_excellent || 0)).slice(0, 3), 'rec_excellent', '到位');
    displayRank('topSetting', [...data].sort((a, b) => (b.set_total || 0) - (a.set_total || 0)).slice(0, 3), 'set_total', '次');

    const effRank = data.map(p => ({
        ...p,
        rate: (p.atk_total || 0) > 0 ? parseFloat(((p.atk_kill / p.atk_total) * 100).toFixed(1)) : 0
    })).sort((a, b) => b.rate - a.rate).slice(0, 3);
    displayRank('topEfficiency', effRank, 'rate', '%');
}

function displayRank(elementId, sortedData, field, unit) {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.innerHTML = sortedData.map((p, i) => `
        <div class="rank-row">
            <span class="rank-no">No.${i + 1}</span>
            <span class="rank-name">${p.name || '---'}</span>
            <span class="rank-val">${p[field] || 0}<small>${unit}</small></span>
        </div>`).join('');
}

// 手機版導覽列開關功能
document.addEventListener("DOMContentLoaded", function() {
    const mobileMenu = document.getElementById("mobile-menu");
    const navList = document.querySelector(".nav-list");

    if (mobileMenu) {
        mobileMenu.addEventListener("click", function(e) {
            e.stopPropagation(); // 防止點擊事件冒泡
            navList.classList.toggle("active");
            
            // 漢堡按鈕動畫切換 (可選)
            mobileMenu.classList.toggle("open");
        });
    }

    // 點擊選單以外的地方自動關閉選單
    document.addEventListener("click", function(e) {
        if (navList.classList.contains("active") && !navList.contains(e.target) && !mobileMenu.contains(e.target)) {
            navList.classList.remove("active");
        }
    });

    // 防止點擊選單內部時自動關閉 (除非點擊的是連結)
    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("active");
        });
    });
});