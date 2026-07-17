export const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
export const uuid=()=>crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;
export const isMobile=()=>/Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
export const formatDate=value=>new Intl.DateTimeFormat('es-CO',{dateStyle:'short',timeStyle:'short'}).format(new Date(value));
export function download(dataUrl,name){const a=document.createElement('a');a.href=dataUrl;a.download=name;a.click()}
export const escapeHtml=value=>String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
