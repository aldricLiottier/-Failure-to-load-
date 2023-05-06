import { requestPost } from "./fetch";

const pushServerPublicKey = "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8";

export function displayNotification() {
    if (window.Notification && Notification.permission === 'granted') {
      notification();
    }
    else if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission(status => {
        if (status === 'granted') {
          notification();
        }
      });
    } else {
      alert(
        'Vous avez refusé les notifications. Changez les paramètres de votre navigateur pour les autorisées.'
      );
    }
  }

  
async function notification() {
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  const subscribe = await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey
  });
  requestPost('/user/notification', {notification: subscribe})
  .then(value => {
    console.log(value);
  });
}