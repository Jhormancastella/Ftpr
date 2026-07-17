import {state} from '../state.js';
export async function listVideoDevices(){const devices=await navigator.mediaDevices.enumerateDevices();state.camera.devices=devices.filter(device=>device.kind==='videoinput');return state.camera.devices}
export function classifyDevice(device,index){const label=(device.label||'').toLowerCase();return {id:device.deviceId,name:device.label||`Cámara ${index+1}`,type:/front|user|selfie|frontal/.test(label)?'front':/back|rear|environment|trasera/.test(label)?'back':'usb'} }
