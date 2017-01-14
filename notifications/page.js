function sendMessage(msg) {
    /* See https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage */
    navigator.serviceWorker.controller.postMessage(msg);
}

function registerWorker() {
    navigator.serviceWorker.register('sw.js');
}

function checkCompatibility() {
    if ("Notification" in window) {
        document.querySelector("#api-supported").classList.remove("hidden");
    } else {
        document.querySelector("#api-unsupported").classList.remove("hidden");
    }
}

document.addEventListener("DOMContentLoaded", function handler(e)) {
    checkCompatibility();
    registerWorker();
}, false);

document.querySelector("#request-permission").addEventListener("click", function handler(e) {
    Notification.requestPermission();
});

document.querySelector("#send-notificarions").addEventListener("click", function handler(e) {
    var text = document.querySelector("#notification-text").value,
        url = document.querySelector("#notification-url").value;

    sendMessage({ url: url, text: text });
}

