// 公告 / 會議紀錄 動態載入（資料來源：data/notices.json，可透過 /admin 後台編輯）
async function loadNotices(targetId, limit) {
  const container = document.getElementById(targetId);
  if (!container) return;
  try {
    const res = await fetch('data/notices.json', { cache: 'no-store' });
    const data = await res.json();
    let items = (data.items || []).slice().sort(function (a, b) {
      return (b.date || '').localeCompare(a.date || '');
    });
    if (limit) items = items.slice(0, limit);

    if (items.length === 0) {
      container.innerHTML = '<div style="padding:24px; color:#6b7a8a; text-align:center;">目前尚無公告。</div>';
      return;
    }

    container.innerHTML = items.map(function (n) {
      const parts = (n.date || '').split('-');
      const mm = parts[1] || '--';
      const dd = parts[2] || '--';
      const docBtn = n.pdfUrl
        ? '<div style="margin-top:8px;"><a class="btn btn-solid" style="padding:8px 16px; font-size:13px;" href="' + n.pdfUrl + '" target="_blank" rel="noopener">查看文件 →</a></div>'
        : '';
      return (
        '<div class="notice-item">' +
          '<div class="notice-date">' + mm + '<br>' + dd + '</div>' +
          '<div>' +
            '<div><span class="notice-tag">' + (n.tag || '') + '</span><span class="notice-title">' + (n.title || '') + '</span></div>' +
            '<div class="notice-meta">發布單位：' + (n.unit || '') + '｜' + (n.date || '') + '</div>' +
            docBtn +
          '</div>' +
        '</div>'
      );
    }).join('');
  } catch (e) {
    container.innerHTML = '<div style="padding:24px; color:#c0392b;">公告資料載入失敗。</div>';
    console.error('載入公告失敗', e);
  }
}
