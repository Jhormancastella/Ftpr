export function canvasToDataUrl(canvas,format='jpeg',quality=.92){return canvas.toDataURL(`image/${format}`,quality)}
export function createCanvas(width,height){const c=document.createElement('canvas');c.width=width;c.height=height;return c}
