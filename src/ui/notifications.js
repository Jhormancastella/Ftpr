let target;export function initNotifications(element){target=element}export function notify(message,type='info'){if(!target)return;target.textContent=message;target.className=`status ${type}`}
