import {renderGallery} from '../capture/gallery.js';

export async function refreshGallery() {
  const container = document.querySelector('#gallery');
  return renderGallery(container, () => refreshGallery());
}
