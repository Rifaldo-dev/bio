const MEDIUM_USERNAME = '@rifaldo';

async function fetchMedium() {
    const container = document.getElementById('medium-container');
    try {
        const rssUrl = `https://medium.com/feed/${MEDIUM_USERNAME}`;
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items.length > 0) {
            const articles = data.items.slice(0, 3);
            container.innerHTML = articles.map(article => {
                const date = new Date(article.pubDate).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric'
                });
                const thumbnail = article.thumbnail || '';
                return `
                    <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="medium-item">
                        ${thumbnail ? `<img src="${thumbnail}" alt="" class="medium-thumb">` : ''}
                        <div class="medium-title">${article.title}</div>
                        <div class="medium-date">${date}</div>
                    </a>
                `;
            }).join('');
        } else {
            container.innerHTML = '<p style="font-size:12px; opacity:0.6;">Belum ada artikel.</p>';
        }
    } catch (error) {
        container.innerHTML = '<p style="font-size:12px; opacity:0.6;">Gagal memuat artikel.</p>';
    }
}
