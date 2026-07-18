import {CONFIG} from '../config.js';
import {drawBackground} from './backgroundEngine.js';
import {state} from '../state.js';

export function renderFrame(ctx, video, mask) {
  const {outputWidth: w, outputHeight: h} = CONFIG;

  // Vista normal: solo el video sin procesar
  if (state.ui.viewMode === 'normal') {
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(video, 0, 0, w, h);
    state.ai.fps = (state.ai.fps || 0) + 1;
    return;
  }

  // Vista con fondo reemplazado
  ctx.clearRect(0, 0, w, h);
  if (mask) {
    // Suavizar bordes de la máscara usando blur
    ctx.filter = 'blur(3px)';
    ctx.drawImage(mask, 0, 0, w, h);
    ctx.filter = 'none';

    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(video, 0, 0, w, h);

    ctx.globalCompositeOperation = 'destination-over';
    drawBackground(ctx, w, h);

    ctx.globalCompositeOperation = 'source-over';
  } else {
    drawBackground(ctx, w, h);
    ctx.globalAlpha = 0.9;
    ctx.drawImage(video, 0, 0, w, h);
    ctx.globalAlpha = 1;
  }
  state.ai.fps = (state.ai.fps || 0) + 1;
}
