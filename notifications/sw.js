self.addEventListener('message', function (e) {
    self.registration.showNotification("Notification", {
        body: e.data.text,
        tag: e.data.url
    });
});e

self.addEventListener('notificationclick', function (e) {
     /* Android doesn’t close the notification when you click on it (http://crbug.com/463146) */
    e.notification.close();
    window.open(e.data.url);
}


