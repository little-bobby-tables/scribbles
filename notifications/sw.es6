'use strict';

self.addEventListener('message', e => {
    self.registration.showNotification("Notification", {
        body: e.data.text,
        tag: e.data.url
    });
});

self.addEventListener('notificationclick', e => {
    e.notification.close();

    const url = e.notification.tag;
    
    e.waitUntil(clients.matchAll({
        type: 'window'
    }).then(clientList => {
        clientList.forEach(c => {
            if (c.url === url && 'focus' in c) {
                return c.focus();
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        });
    }));
});

