self.addEventListener('message', function (e) {
    self.registration.showNotification("Notification", {
        body: e.data.text,
        tag: e.data.url
    });
});

self.addEventListener('notificationclick', function (e) {
    e.notification.close();
    
    e.waitUntil(clients.matchAll({
          type: 'window'
    }).then(function(clients) {
        for (var i = 0; i < clients.length; i++) {
            var client = clients[i];
            if (client.url === e.data.url && 'focus' in client) {
                return client.focus();
            }
            if (client.openWindow) {
                return client.openWindow('/');
            }
        }
    });
});
