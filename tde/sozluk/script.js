document.addEventListener('DOMContentLoaded', () => {
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  const form = document.getElementById('searchForm');
  const resultsDiv = document.getElementById('results');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = document.getElementById('searchInput');
    let keyword = input.value.trim();

    if (!keyword) {
      resultsDiv.innerHTML = `<p class="info-msg">Lütfen bir kelime yazın.</p>`;
      return;
    }

    keyword = keyword
      .normalize('NFC')
      .toLowerCase('tr-TR')
      .replace(/\s+/g, ' ')
      .trim();

    resultsDiv.innerHTML = `<p class="info-msg">🔍 Aranıyor...</p>`;

    try {
      const response = await fetch(`https://sozluk.gov.tr/gts?ara=${encodeURIComponent(keyword)}`);
      if (!response.ok) throw new Error(`Ağ hatası: ${response.status}`);

      const data = await response.json();
      const entry = data && data[0];

      if (!entry || !entry.anlamlarListe || entry.anlamlarListe.length === 0) {
        resultsDiv.innerHTML = `<p class="error-msg">❌ “${keyword}” kelimesi bulunamadı veya anlamı yok.</p>`;
        return;
      }

      const anlamlarHTML = entry.anlamlarListe
        .map((anlam, i) => {
          const anl = anlam.anlam ? anlam.anlam.trim() : '';
          const ornek = anlam.ornek && anlam.ornek.trim() !== '' ? `<br><em>“${anlam.ornek.trim()}”</em>` : '';
          return `<div class="definition"><strong>${i + 1}.</strong> ${anl}${ornek}</div>`;
        })
        .join('');

      resultsDiv.innerHTML = `<h2>📖 "${entry.madde}" Anlamları:</h2>${anlamlarHTML}`;
    } catch (err) {
      resultsDiv.innerHTML = `<p class="error-msg">⚠️ Bir hata oluştu: ${err.message}</p>`;
    }
  });
});
