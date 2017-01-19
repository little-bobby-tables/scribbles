'use strict';

function setup() {
    checkCompatibility();
    registerWorker();

    document.querySelector("#request-permission").addEventListener("click", requestPermission);
    document.querySelector("#send-notification").addEventListener("click", sendNotification);
}

function checkCompatibility() {
    if ("Notification" in window) {
        document.querySelector("#api-supported").classList.remove("hidden");
    }
    else {
        document.querySelector("#api-unsupported").classList.remove("hidden");
    }
}

function registerWorker() {
    navigator.serviceWorker.register('sw.js');
}

function requestPermission() {
    Notification.requestPermission();
}

function sendNotification() {
    const text = document.querySelector("#notification-text").value,
          url = document.querySelector("#notification-url").value;

    postMessageToWorker({ url: url, text: text });
}

function postMessageToWorker(msg) {
    /* See https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage */
    navigator.serviceWorker.controller.postMessage(msg);
}

document.addEventListener("DOMContentLoaded", setup, false);
