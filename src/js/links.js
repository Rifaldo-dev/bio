const API_URL = 'https://sheetdb.io/api/v1/avudjo9zl5j3c';
const ITEMS_PER_PAGE = 4;
let allItems = [];
let currentPage = 1;
let searchQuery = '';

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderBio(data);
    } catch (error) {
        document.getElementById('links-section').innerHTML = `
            <p class="loading">Gagal memuat data. Silakan coba lagi.</p>
        `;
    }
}

function renderBio(items) {
    const profileSection = document.getElementById('profile-section');

    allItems = items.filter(item => item.status === 'aktif');

    profileSection.innerHTML = `
        <div class="profile-section fade-up">
            <div class="avatar"><img src="./public/pp.png" alt="Profile"></div>
            <h1 class="profile-name">M. Rifaldo Saputra</h1>
            <p class="profile-bio">Kumpulan link project & karya digital</p>
            <div class="social-icons">
                <a href="https://instagram.com/rifaldo.dev" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-instagram"></i></a>
                <a href="https://github.com/rifaldo-dev" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-github"></i></a>
                <a href="https://tiktok.com/@rifaldo.dev" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-tiktok"></i></a>
                <a href="https://aldo.is-a.dev" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fas fa-globe"></i></a>
            </div>
        </div>
    `;

    renderLinks();
    initScrollNavbar();
}

function renderLinks() {
    const linksSection = document.getElementById('links-section');

    const filtered = allItems.filter(item => {
        const q = searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(q) || 
               (item.desc && item.desc.toLowerCase().includes(q));
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages || 1;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paged = filtered.slice(start, start + ITEMS_PER_PAGE);

    let html = `
        <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="searchInput" placeholder="Cari link..." value="${searchQuery}">
        </div>
    `;

    if (paged.length > 0) {
        paged.forEach((item, index) => {
            const desc = item.desc ? item.desc.replace(/\r\n/g, ' ').replace(/\n/g, ' ') : '';
            html += `
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" 
                   class="link-btn fade-up" style="animation-delay: ${(index + 1) * 0.08}s">
                    <div class="link-title">${item.name}</div>
                    ${desc ? `<div class="link-desc">${desc}</div>` : ''}
                    <span class="link-button">Kunjungi →</span>
                </a>
            `;
        });
    } else {
        html += `<p style="font-size:14px; font-weight:600; opacity:0.6; text-align:center; padding:20px;">Tidak ditemukan.</p>`;
    }

    if (totalPages > 1) {
        html += `<div class="pagination">`;
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        html += `</div>`;
    }

    linksSection.innerHTML = html;

    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1;
        renderLinks();
    });

    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentPage = parseInt(e.target.dataset.page);
            renderLinks();
        });
    });
}
