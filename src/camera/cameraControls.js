import {state} from '../state.js';
export function getCapabilities(){state.camera.capabilities=state.camera.track?.getCapabilities?.()||{};return state.camera.capabilities}
export async function applyConstraint(name,value){const track=state.camera.track;if(!track)return false;try{await track.applyConstraints({advanced:[{[name]:value}]});return true}catch(error){console.warn(`No se pudo aplicar ${name}`,error);return false}}
