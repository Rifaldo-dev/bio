const YOUTUBE_FEED = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCLmWpq_1Trhh5FS9P_v_SdA';

async function fetchYouTube() {
    const container = document.getElementById('youtube-container');
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(YOUTUBE_FEED)}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            const videos = data.items.slice(0, 3);
            container.innerHTML = videos.map(video => {
                const date = new Date(video.pubDate).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric'
                });
                return `
                    <a href="${video.link}" target="_blank" rel="noopener noreferrer" class="yt-item">
                        <div class="yt-title">${video.title}</div>
                        <div class="yt-date">${date}</div>
                    </a>
                `;
            }).join('');
        } else {
            container.innerHTML = '<p style="font-size:12px; opacity:0.6;">Belum ada video.</p>';
        }
    } catch (error) {
        container.innerHTML = '<p style="font-size:12px; opacity:0.6;">Gagal memuat video.</p>';
    }
}
