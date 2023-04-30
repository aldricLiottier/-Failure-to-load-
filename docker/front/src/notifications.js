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

  
function notification() {
    const options = {
      body: 'Testing Our Notification',
      icon: './bell.png'
    };
    if ('serviceWorker' in navigator)
    {
      navigator.serviceWorker.showNotification('PWA Notification!', options);
    }
  }