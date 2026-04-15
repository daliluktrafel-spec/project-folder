// هذا الملف يعمل في الخلفية حتى والجوال مطفأ
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAMEoUTIMAS0mh06_SxrM2T_efDxEmEoxg",
  databaseURL: "https://wafaseiyunshop-default-rtdb.firebaseio.com", // أضف هذا السطر ضروري جداً
  projectId: "wafaseiyunshop",
  messagingSenderId: "101115796279",
  appId: "1:101115796279:web:3753efad2a443c9b6098b2"
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('وصل طلب جديد في الخلفية: ', payload);
  
  const notificationTitle = '🛵 طلب جديد في متاجر البلاد!';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png',
    tag: 'order-alert', // هذا التاج يمنع تكرار الإشعارات فوق بعضها
    renotify: true,    // يجعل الجوال يهتز مجدداً مع كل إشعار
    requireInteraction: true, // الإشعار لا يختفي أبداً حتى يضغط عليه المندوب
    vibrate: [200, 100, 200, 100, 200, 100, 400], // اهتزاز قوي
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
