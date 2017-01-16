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
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === url && 'focus' in client) {
                return client.focus();
            }
            if (clients.openWindow) {
                return clients.openWindow(url).then(function (windowClient) {
                    /* windowClient is null unless the URL is from the same origin as the service worker. */
                    if (windowClient) windowClient.focus();
                });
            }
        }
    }));
});
