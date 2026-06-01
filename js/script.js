document.addEventListener('DOMContentLoaded', () => {
    
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