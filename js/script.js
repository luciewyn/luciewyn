document.addEventListener('DOMContentLoaded', () => {
   // ==========================================
// 首頁：滑動洗牌縮圖生成器 (FLIP 動畫技術)
// ==========================================

const PORTFOLIO_PROJECTS = [
    { img: 'assets/images/01_gratislove/opencall.gif', url: 'projects/01_gratislove.html', title: 'GRATIS LOVE' },
    { img: 'assets/images/01_gratislove/gratisbox.jpg', url: 'projects/01_gratislove.html', title: 'GRATIS LOVE' },
    { img: 'assets/images/01_gratislove/05.jpg', url: 'projects/01_gratislove.html', title: 'GRATIS LOVE', hasShadow: true },

    { img: 'assets/images/02_smallcameras/mango.jpg', url: 'projects/02_smallcameras.html', title: 'smallcameras' },

    { img: 'assets/images/03_ensembale/web.gif', url: 'projects/03_ensembale.html', title: 'ensembale' , hasShadow: true},

    { img: 'assets/images/04_kunstmuseum/flyer.jpg', url: 'projects/04_kunstmuseum.html', title: 'What’s on your mind?' },
    { img: 'assets/images/05_authorship/001.jpg', url: 'projects/05_authorship.html', title: 'Poster' },
    { img: 'assets/images/06_meta/0001.jpg', url: 'projects/06_meta.html', title: 'Metamorphosis' },
    { img: 'assets/images/06_meta/08.jpg', url: 'projects/06_meta.html', title: 'Metamorphosis' },
    { img: 'assets/images/07_howtostayalive/cover.jpg', url: 'projects/07_howtostayalive.html', title: 'How to Stay Alive' },
    { img: 'assets/images/07_howtostayalive/04.jpg', url: 'projects/07_howtostayalive.html', title: 'How to Stay Alive' },
    { img: 'assets/images/07_howtostayalive/tag.jpg', url: 'projects/07_howtostayalive.html', title: 'How to Stay Alive' },
    { img: 'assets/images/08_creditcookbook/01.png', url: 'projects/08_creditcookbook.html', title: 'Credit Cookbook' },
    { img: 'assets/images/09_variablefont/002.jpg', url: 'projects/09_gradshow.html', title: 'NKNU' },
    { img: 'assets/images/09_variablefont/001.jpg', url: 'projects/09_gradshow.html', title: 'NKNU' },
    { img: 'assets/images/09_variablefont/006.jpg', url: 'projects/09_gradshow.html', title: 'NKNU' },
    { img: 'assets/images/10_illustration/05.gif', url: 'projects/10_illustration.html', title: 'illustration' },
    { img: 'assets/images/11_oneofakind/pottery.gif', url: 'projects/11_oneofakind.html', title: 'Pottery' },
];

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 1. 初始化網格 (只在頁面載入時執行一次，把 HTML 建立起來)
function initGrid() {
    const grid = document.getElementById('thumbnail-grid');
    if (!grid) return; 

    const sizes = ['size-s', 'size-m', 'size-l'];
    const randomProjects = shuffleArray(PORTFOLIO_PROJECTS);

    grid.innerHTML = randomProjects.map(proj => {
        const randomSizeClass = sizes[Math.floor(Math.random() * sizes.length)];
        
        // 🔥 判斷邏輯：如果這張圖有 hasShadow，就給它 'with-shadow' 這個 class，否則留空
        const shadowClass = proj.hasShadow ? 'with-shadow' : '';

        return `
            <a href="${proj.url}" class="thumb-item ${randomSizeClass} ${shadowClass}">
                <img src="${proj.img}" alt="${proj.title}">
            </a>
        `;
    }).join('');
}

// 2. 執行「滑動洗牌」動畫 (FLIP 技巧)
function animateShuffle() {
    const grid = document.getElementById('thumbnail-grid');
    if (!grid) return;

    // 抓取畫面上所有的縮圖元素
    const items = Array.from(grid.children);

    // 【First】記錄洗牌前，每個元素在畫面上的 X, Y 座標
    const firstPositions = items.map(item => item.getBoundingClientRect());

    // 【洗牌】將 DOM 元素打亂，重新塞回網格中 (此時瀏覽器已經改變了它們的位置)
    const shuffledItems = shuffleArray(items);
    shuffledItems.forEach(item => grid.appendChild(item));

    // 【Last】記錄洗牌後，每個元素的新 X, Y 座標
    const lastPositions = items.map(item => item.getBoundingClientRect());

    // 【Invert & Play】計算座標差值，讓它們滑動過去
    items.forEach((item, index) => {
        const first = firstPositions[index];
        const last = lastPositions[index];

        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;

        // Invert: 瞬間把它偷偷移回原本的位置 (不帶動畫)
        item.style.transition = 'none';
        item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        // Play: 觸發瀏覽器重繪後，啟動動畫讓它滑向新位置
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // 設定 0.8 秒的滑動動畫，cubic-bezier 讓滑動有流暢的加減速感
                item.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
                item.style.transform = 'translate(0, 0)';
            });
        });
    });
}

// 執行初始化，把圖片放上去
initGrid();

// 設定計時器：每 5 秒觸發一次滑動洗牌
setInterval(animateShuffle, 7000);

    // ==========================================
    // 1. Info 面板滑出/收起邏輯 (支援多個按鈕觸發)
    // ==========================================
    // 改用 querySelectorAll 抓取所有帶有 'trigger-info' class 的按鈕
    const triggerBtns = document.querySelectorAll('.trigger-info'); 
    const infoPanel = document.getElementById('info-panel');
    const bottomBar = document.getElementById('bottom-bar');
    
    // 單獨抓取右邊的 Info 按鈕 (用新的 ID)，為了改變它的文字
    const infoBtnText = document.getElementById('info-btn-text'); 

    // 確保這些元素存在才執行
    if (triggerBtns.length > 0 && infoPanel) {
        // 使用 forEach 迴圈，幫每一個按鈕都綁定點擊事件
        triggerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 切換面板和導覽列的 active 狀態
                infoPanel.classList.toggle('active');
                if (bottomBar) bottomBar.classList.toggle('active');
                
                // 只針對右邊的 Info 按鈕改變文字 (避免 Logo 文字被蓋掉)
                if (infoBtnText) {
                    if (infoPanel.classList.contains('active')) {
                        infoBtnText.textContent = 'Close';
                    } else {
                        infoBtnText.textContent = 'Info';
                    }
                }
            });
        });
    }

    // ==========================================
    // 2. Projects 目錄頁的 Hover 圖片預覽功能
    // ==========================================
    const projectItems = document.querySelectorAll('.project-item');
    const previewImg = document.getElementById('preview-img');
    const previewCategory = document.getElementById('preview-category');

    // 確認這是在 projects.html 頁面才執行，避免在首頁報錯
    if (projectItems.length > 0 && previewImg) {
        projectItems.forEach(item => {
            // 當滑鼠移入 (Hover)
            item.addEventListener('mouseenter', () => {
                // 1. 抓取該項目 HTML 裡設定的資料
                const imgSrc = item.getAttribute('data-image');
                const categoryText = item.getAttribute('data-category');

                // 2. 替換圖片 src 與文字
                if (imgSrc) previewImg.src = imgSrc;
                if (categoryText && previewCategory) previewCategory.textContent = categoryText;

                // 3. 加上 'show' class 觸發 CSS 的淡入動畫
                previewImg.classList.add('show');
                if (previewCategory) previewCategory.classList.add('show');
            });

            // 當滑鼠移出
            item.addEventListener('mouseleave', () => {
                // 移除 'show' class 讓圖片淡出消失
                previewImg.classList.remove('show');
                if (previewCategory) previewCategory.classList.remove('show');
            });
        });
    }

});

// ==========================================
    // 3. 單一作品頁：Back to Top 滑順滾動
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止原本瞬間跳轉的預設行為
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // 啟動滑順滾動
            });
        });
    }