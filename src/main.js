import {startApp} from './app.js';
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('/Ftpr/service-worker.js').catch(error=>console.warn('Service Worker:',error)));
startApp();
