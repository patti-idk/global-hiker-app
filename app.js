// 載入健行路線資料
async function loadRoutes() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        displayRoutes(data.routes);
    } catch (error) {
        console.error('載入路線資料時發生錯誤:', error);
        document.getElementById('routesContainer').innerHTML = 
            '<p style="text-align: center; color: #6c757d;">無法載入路線資料，請稍後再試。</p>';
    }
}

// 顯示路線卡片
function displayRoutes(routes) {
    const container = document.getElementById('routesContainer');
    
    if (!container) return;
    
    container.innerHTML = routes.map(route => `
        <div class="route-card">
            <div class="route-image">${getRouteEmoji(route.continent)}</div>
            <div class="route-content">
                <h3 class="route-title">${route.name}</h3>
                <div class="route-location">
                    <span>📍</span>
                    <span>${route.location}</span>
                </div>
                <p style="color: #6c757d; margin: 1rem 0; line-height: 1.6;">${route.description}</p>
                <div class="route-info">
                    <div class="route-info-item">
                        <span class="route-info-label">距離</span>
                        <span class="route-info-value">${route.distance}</span>
                    </div>
                    <div class="route-info-item">
                        <span class="route-info-label">時間</span>
                        <span class="route-info-value">${route.duration}</span>
                    </div>
                    <div class="route-info-item">
                        <span class="route-info-label">海拔</span>
                        <span class="route-info-value">${route.elevation}</span>
                    </div>
                </div>
                <div class="route-difficulty difficulty-${route.difficulty}">
                    ${getDifficultyLabel(route.difficulty)}
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e9ecef;">
                    <div style="font-size: 0.85rem; color: #6c757d; margin-bottom: 0.5rem;">
                        <strong>最佳季節：</strong>${route.bestSeason}
                    </div>
                    <div style="font-size: 0.85rem; color: #6c757d;">
                        <strong>亮點：</strong>${route.highlights.join('、')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 根據大洲返回對應的 emoji
function getRouteEmoji(continent) {
    const emojis = {
        '亞洲': '⛰️',
        '北美洲': '🏔️',
        '南美洲': '🌋',
        '歐洲': '🏕️',
        '非洲': '🌍',
        '大洋洲': '🏝️'
    };
    return emojis[continent] || '🥾';
}

// 取得難度標籤
function getDifficultyLabel(difficulty) {
    const labels = {
        'easy': '簡單',
        'medium': '中等',
        'hard': '困難',
        'expert': '專家'
    };
    return labels[difficulty] || difficulty;
}

// 平滑滾動到路線區域
function scrollToRoutes() {
    const routesSection = document.getElementById('routes');
    if (routesSection) {
        routesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 頁面載入時執行
document.addEventListener('DOMContentLoaded', () => {
    loadRoutes();
    
    // 為導航連結添加平滑滾動
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
