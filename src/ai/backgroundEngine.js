import {state} from '../state.js';
export function setColor(color){state.background={type:'color',color,image:null,imageName:null}}
export function setTransparent(){state.background={type:'transparent',color:null,image:null,imageName:null}}
export function setImage(image,name){state.background={type:'image',color:null,image,imageName:name}}
export function drawBackground(ctx,width,height){if(state.background.type==='image'&&state.background.image)ctx.drawImage(state.background.image,0,0,width,height);else if(state.background.type==='color'){ctx.fillStyle=state.background.color;ctx.fillRect(0,0,width,height)}}
