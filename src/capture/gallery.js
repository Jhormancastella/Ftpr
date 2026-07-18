import {listCaptures, deleteCapture} from '../utils/storage.js';
import {formatDate, escapeHtml} from '../utils/helpers.js';

export async function renderGallery(container, onDelete) {
  const records = await listCaptures();
  if (!records.length) {
    container.innerHTML = '<p class="empty">Aún no hay fotografías guardadas.</p>';
    return records;
  }
  container.innerHTML = records.map(record => `
    <article class="gallery-card" data-id="${record.id}">
      <img src="${record.edited}" alt="Captura del ${escapeHtml(formatDate(record.createdAt))}">
      <div class="gallery-card-actions">
        <a href="${record.edited}" download="ftpr-${record.id}.jpg" class="btn-download">⬇ Descargar</a>
        <button class="btn-delete" data-id="${record.id}" title="Eliminar foto">🗑</button>
      </div>
      <span class="gallery-card-date">${escapeHtml(formatDate(record.createdAt))}</span>
    </article>
  `).join('');

  container.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      btn.disabled = true;
      await deleteCapture(id);
      if (onDelete) onDelete();
    });
  });

  return records;
}

export {deleteCapture};
