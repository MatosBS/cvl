import { notificationElements } from '../elements/dom.js';

try {
  fetch("./assets/data/notification.json").then(notificationResponse => {
    notificationResponse.json().then(notification => {
      let dateFrom = Date.parse(notification[0].notification.dateFrom);
      let dateTo = Date.parse(notification[0].notification.dateTo);
      let dateNow = Date.now();
      
      if(notification[0].notification.enabled &&
        dateNow >= dateFrom &&
        dateNow <= dateTo){
        notificationElements.notificationBar.style.display = 'flex';
        notificationElements.notificationMessage.innerHTML = notification[0].notification.message;
      }
    });
  });
} catch (error) {
  console.log(error);
}