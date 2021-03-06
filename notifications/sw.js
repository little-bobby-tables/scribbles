'use strict';

self.addEventListener('message', function (e) {
    self.registration.showNotification("Notification", {
        body: e.data.text,
        tag: e.data.url
    });
});

self.addEventListener('notificationclick', function (e) {
    e.notification.close();

    var url = e.notification.tag;

    e.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function (clientList) {
        clientList.forEach(function (c) {
            if (c.url === url && 'focus' in c) {
                return c.focus();
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        });
    }));
});
