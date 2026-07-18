import {state} from '../state.js';
import {CONFIG} from '../config.js';

// Detecta si el sujeto principal es una persona o un objeto/producto
// comparando la distribución de la máscara con heurísticas de posición
export function detectSubjectMode(mask, canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const data = ctx.getImageData(0, 0, w, h).data;
  let topHalf = 0, bottomHalf = 0, total = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const v = data[i]; // canal rojo = valor máscara
      if (v > 128) {
        total++;
        if (y < h / 2) topHalf++; else bottomHalf++;
      }
    }
  }
  if (total === 0) return state.ai.subjectMode;
  // Si hay presencia significativa en la mitad superior → persona (cara/cuerpo)
  const ratio = topHalf / total;
  return ratio > 0.35 ? 'person' : 'product';
}

export async function createSegmentation(onResults) {
  if (!window.SelfieSegmentation) throw new Error('MediaPipe no está disponible');
  const model = new window.SelfieSegmentation({
    locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
  });
  // modelSelection 1 = paisaje general (mejor para objetos), 0 = selfie
  model.setOptions({ modelSelection: 1, selfieMode: false });
  model.onResults(onResults);
  await model.initialize();
  state.ai.loaded = true;
  return model;
}

export function createFrameLoop(video, model, processCanvas) {
  let last = 0, wrapper = null;
  const ctx = processCanvas.getContext('2d');
  let frameCount = 0;
  wrapper = new window.Camera(video, {
    width: CONFIG.processWidth,
    height: CONFIG.processHeight,
    onFrame: async () => {
      const now = performance.now();
      if (state.ai.processing || now - last < 1000 / CONFIG.targetFps || video.readyState < 2) return;
      state.ai.processing = true;
      last = now;
      try {
        ctx.drawImage(video, 0, 0, CONFIG.processWidth, CONFIG.processHeight);
        await model.send({ image: processCanvas });
        // Detectar modo cada 30 frames para no sobrecargar
        frameCount++;
        if (frameCount % 30 === 0) {
          state.ai.subjectMode = detectSubjectMode(model, processCanvas);
        }
      } finally {
        state.ai.processing = false;
      }
    }
  });
  wrapper.start();
  return wrapper;
}
