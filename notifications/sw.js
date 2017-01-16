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
    }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === url && 'focus' in client) {
                return client.focus();
            }
            if (client.openWindow) {
                return client.openWindow(url);
            }
        }
    }));
});
