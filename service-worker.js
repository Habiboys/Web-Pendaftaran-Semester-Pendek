importScripts("https://js.pusher.com/beams/service-worker.js");

PusherPushNotifications.onNotificationReceived = ({ pushEvent, payload }) => {
  console.log("Notification received:", payload);

  pushEvent.waitUntil(
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
      deep_link: payload.notification.deep_link,
      data: payload.data,
      actions: [{ action: "open_url", title: "Open" }],
    })
  );

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      console.log("Posting message to client:", client);
      client.postMessage({
        type: "PUSH_NOTIFICATION",
        data: payload.notification,
      });
    });
  });
};

self.addEventListener("notificationclick", function (event) {
  const urlToOpen = event.notification.data.url;
  console.log("Notification click received, opening URL:", urlToOpen);

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        const matchingClient = windowClients.find((client) => {
          return client.url === urlToOpen;
        });

        if (matchingClient) {
          return matchingClient.focus();
        } else {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
