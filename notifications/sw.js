self.addEventListener('message', function (e) {
    self.registration.showNotification("Notification", {
        body: e.data.text,
        tag: e.data.url
    });
});

self.addEventListener('notificationclick', function (e) {
    e.notification.close();
    
    clients.matchAll().then(function (clients) {
        clients.openWindow(e.data.url);
    }
});
