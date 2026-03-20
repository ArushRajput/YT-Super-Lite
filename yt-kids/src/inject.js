(function() {
    console.log('YouTube Brave: Premium experience active');

    // 1. Core Styles: Ad Blocking, Dark Mode, & Brave Aesthetic
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide Ads Aggressively (Mobile & Desktop) */
        .ad-container, .ad-display-container, .ad-unit, .video-ads, 
        .ytp-ad-module, .ytp-ad-player-overlay, .player-ads, 
        #masthead-ad, #player-ads, .ytd-promoted-video-renderer-ad-label, 
        .ytd-video-masthead-ad-v3-renderer, ytd-promoted-sparkles-web-renderer, 
        ytd-promoted-sparkles-text-search-renderer, .ytd-display-ad-renderer, 
        .ytd-promoted-sparkles-renderer, .ytd-promoted-video-renderer, 
        .ytd-plus-one-ad-renderer, .ytp-ad-overlay-container,
        #offer-section, .ytp-paid-content-overlay,
        ytd-display-ad-renderer, ytd-ad-slot-renderer, 
        .ytp-ad-progress-list, .ytp-ad-overlay-container,
        ytd-rich-item-renderer:has(ytd-ad-slot-renderer),
        ytd-rich-item-renderer:has(.ytd-ad-slot-renderer),
        ytd-rich-item-renderer:has([is-promoted]),
        ytd-rich-item-renderer:has(.ytd-rich-grid-media:has(.ytd-ad-slot-renderer)) {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Brave Aesthetic & Dark Mode */
        html, body, ytd-app, ytm-app {
            background-color: #0f0f0f !important;
            color: #ffffff !important;
        }

        /* Brave Accent Colors (Orange) */
        .yt-spec-button-shape-next--filled-brand, .yt-spec-button-shape-next--call-to-action {
            background-color: #ff5000 !important;
            color: white !important;
        }
        #progress.ytd-thumbnail-overlay-resume-playback-renderer {
            background-color: #ff5000 !important;
        }

        /* Dashboard UI */
        #brave-shell {
            position: fixed; top: 15px; right: 15px; z-index: 2147483647;
            pointer-events: none; transition: all 0.3s ease;
        }
        #brave-stats {
            background: rgba(20, 20, 20, 0.9); border: 1px solid rgba(255, 80, 0, 0.5);
            border-radius: 16px; padding: 12px 16px; color: white; 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            box-shadow: 0 8px 32px rgba(0,0,0,0.8); font-size: 13px;
            min-width: 160px; backdrop-filter: blur(12px);
            opacity: 0; transform: translateY(-10px);
            pointer-events: auto;
        }
        #brave-stats.visible {
            opacity: 1; transform: translateY(0);
        }
        #brave-shield {
            width: 40px; height: 40px; background: #ff5000; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 12px rgba(255, 80, 0, 0.4); 
            cursor: pointer; pointer-events: auto; float: right; 
            margin-bottom: 8px; transition: transform 0.2s;
        }
        #brave-shield:hover { transform: scale(1.1); }
        .stat-row { display: flex; justify-content: space-between; margin-top: 5px; }
        .stat-label { color: #aaa; }
        .stat-value { color: #ff5000; font-weight: bold; }
    `;
    document.head.appendChild(style);

    // 2. Dashboard HTML
    const shell = document.createElement('div');
    shell.id = 'brave-shell';
    shell.innerHTML = `
        <div id="brave-shield" title="Brave Shields">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.75-7 9.81-3.87-1.06-7-5.14-7-9.81V6.3l7-3.12z"/>
            </svg>
        </div>
        <div id="brave-stats">
            <div style="color: #ff5000; font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #333; padding-bottom: 4px;"> Shields Up!</div>
            <div class="stat-row">
                <span class="stat-label">Ads Blocked:</span>
                <span id="ads-count" class="stat-value">0</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Data Saved:</span>
                <span id="data-count" class="stat-value">0.0 MB</span>
            </div>
            <div style="font-size: 10px; color: #666; margin-top: 8px; text-align: center;">Quality: Locked at 360p</div>
        </div>
    `;
    document.body.appendChild(shell);

    const shield = document.getElementById('brave-shield');
    const stats = document.getElementById('brave-stats');
    shield.onclick = () => stats.classList.toggle('visible');

    // 3. Core Logic (Data Saver)
    function dataSaver() {
        // Skip Video Ads (Modern & Classic)
        const skipButtons = ['.ytp-ad-skip-button', '.ytp-ad-skip-button-modern', '.videoAdUiSkipButton'];
        skipButtons.forEach(s => { const b = document.querySelector(s); if (b) b.click(); });

        const adVid = document.querySelector('.ad-showing video, .ad-interrupting video');
        if (adVid && adVid.duration > 0 && isFinite(adVid.duration)) {
            adVid.currentTime = adVid.duration;
            adVid.muted = true;
        }

        // Quality Persistence (360p)
        const player = document.getElementById('movie_player') || document.querySelector('.html5-video-player');
        if (player && typeof player.setPlaybackQualityRange === 'function') {
            if (player.getPlaybackQuality() !== 'medium') player.setPlaybackQualityRange('small', 'medium');
        }

        // Autoplay Disable
        const autonav = document.querySelector('.ytp-autonav-toggle-button');
        if (autonav && autonav.getAttribute('aria-checked') === 'true') autonav.click();

        // AD REMOVAL (Aggressive)
        const adSelectors = [
            'ytd-ad-slot-renderer', 'ytm-promoted-video-renderer', 'ytd-display-ad-renderer', 
            'ytd-promoted-sparkles-text-search-renderer', 'ytd-promoted-sparkles-web-renderer',
            '.ytd-ad-slot-renderer', '.ytd-display-ad-renderer', '.ytp-ad-overlay-container',
            'ytd-rich-item-renderer:has(ytd-ad-slot-renderer)',
            'ytd-rich-item-renderer:has([is-promoted])',
            'ytd-rich-item-renderer:has(.ytd-ad-slot-renderer)'
        ];

        adSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
        });

        // Search for 'Sponsored' text fallback
        document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytm-rich-item-renderer').forEach(item => {
            const text = item.innerText || "";
            if (text.includes('Sponsored') || text.includes('Pro-moted') || item.querySelector('[aria-label="Sponsored"]')) {
                item.remove();
            }
        });
    }

    // 4. MutationObserver for real-time removal (Brave-like speed)
    const observer = new MutationObserver((mutations) => {
        dataSaver();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 5. Stats Update
    async function updateStats() {
        try {
            if (window.__TAURI__) {
                const count = await window.__TAURI__.invoke('get_stats');
                document.getElementById('ads-count').innerText = count;
                document.getElementById('data-count').innerText = (count * 0.15).toFixed(1) + ' MB';
            }
        } catch (e) {}
    }

    // Init Logic
    setInterval(dataSaver, 2000); // Fallback interval
    setInterval(updateStats, 2000);
    setTimeout(() => stats.classList.add('visible'), 1000);
    setTimeout(() => stats.classList.remove('visible'), 5000);
})();
