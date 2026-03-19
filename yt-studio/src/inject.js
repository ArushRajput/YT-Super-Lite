(function() {
    console.log('YT Studio: Streamer Edition Active');

    // 1. Core Styles: Dark Mode & Minimalist UI
    const style = document.createElement('style');
    style.innerHTML = `
        /* Force Dark Mode */
        html, body {
            background-color: #0f0f0f !important;
            color: #ffffff !important;
        }

        /* Hide Unnecessary Promotional Banners */
        #promotion-shelf, .yt-studio-promo, .upsell-dialog-renderer {
            display: none !important;
        }

        /* Streamer HUD */
        #streamer-hud {
            position: fixed; bottom: 15px; left: 15px; z-index: 2147483647;
            background: rgba(10, 10, 10, 0.9); border: 1px solid #ff0000;
            border-radius: 10px; padding: 8px 15px; color: white;
            font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            backdrop-filter: blur(10px); pointer-events: none;
            display: flex; gap: 15px; align-items: center;
            border-left: 4px solid #ff0000;
        }
        .hud-label { color: #888; margin-right: 5px; text-transform: uppercase; font-size: 10px; letter-spacing: 1px; }
        .hud-value { color: #ff0000; font-weight: bold; font-family: monospace; }
        .hud-brand { color: #ffffff; font-weight: bold; border-right: 1px solid #333; padding-right: 12px; font-style: italic; }
    `;
    document.head.appendChild(style);

    // 2. HUD HTML
    const hud = document.createElement('div');
    hud.id = 'streamer-hud';
    hud.innerHTML = `
        <span class="hud-brand">YT STUDIO [STREAMER]</span>
        <div><span class="hud-label">APP CPU:</span><span id="hud-cpu" class="hud-value">0.0%</span></div>
        <div><span class="hud-label">APP RAM:</span><span id="hud-ram" class="hud-value">0 MB</span></div>
        <div style="font-size: 9px; color: #555; margin-left: 10px; border-left: 1px solid #222; padding-left: 10px;">FPS OPTIMIZED</div>
    `;
    document.body.appendChild(hud);

    // 3. Stats logic
    async function updateHUD() {
        try {
            if (window.__TAURI__) {
                const stats = await window.__TAURI__.invoke('get_resource_usage');
                document.getElementById('hud-cpu').innerText = stats.cpu.toFixed(1) + '%';
                document.getElementById('hud-ram').innerText = stats.ram_mb + ' MB';
            }
        } catch (e) {}
    }

    // Refresh every 4 seconds to minimize overhead
    setInterval(updateHUD, 4000);
    setTimeout(updateHUD, 2000);
})();
