import {getPreference,setPreference} from '../utils/storage.js';
export async function loadPreferences(){return {deviceId:await getPreference('deviceId'),background:await getPreference('background'),format:await getPreference('format','jpeg')}}
export const savePreference=setPreference;
