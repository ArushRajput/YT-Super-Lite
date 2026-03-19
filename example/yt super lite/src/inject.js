(function() {
    console.log('YT Super Lite: Data Saver Active');

    // 1. Force 360p Quality (Medium)
    function forceQuality() {
        const player = document.getElementById('movie_player') || document.querySelector('.html5-video-player');
        if (player && typeof player.setPlaybackQualityRange === 'function') {
            if (player.getPlaybackQuality() !== 'medium') {
                player.setPlaybackQualityRange('small', 'medium');
            }
        }
    }

    // 2. Simple CSS Tweaks (Dark Mode)
    const style = document.createElement('style');
    style.innerHTML = `
        html, body {
            background-color: #000 !important;
            color: #fff !important;
        }
    `;
    document.head.appendChild(style);

    // Initial check and periodic refresh
    setInterval(forceQuality, 3000);
})();
