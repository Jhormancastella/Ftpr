export const state = { camera:{devices:[],activeDeviceId:null,stream:null,track:null,capabilities:{},ready:false}, ai:{loaded:false,processing:false,fps:0}, background:{type:'color',color:'#1a1a2e',image:null,imageName:null}, capture:{quality:.92,format:'jpeg'}, ui:{mobile:false,sidebarOpen:false,fullscreen:false} };
const listeners = new Set();
export function patchState(patch){ Object.assign(state,patch); listeners.forEach(fn=>fn(state)); }
export function subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)}
