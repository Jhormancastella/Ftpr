export function toggleSidebar(force){const sidebar=document.querySelector('#sidebar');const open=force??!sidebar.classList.contains('open');sidebar.classList.toggle('open',open);return open}
