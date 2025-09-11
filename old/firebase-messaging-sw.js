importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAS9aLjkPg5xhAuoEPAOH211u7dvpeUxFw",
  authDomain: "talbak-3e58a.firebaseapp.com",
  projectId: "talbak-3e58a",
  storageBucket: "talbak-3e58a.firebasestorage.app",
  messagingSenderId: "193949076564",
  appId: "1:193949076564:web:b354da01e107c9350b71c1",
  measurementId: "G-76C7DJ4Y5E"
});


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});