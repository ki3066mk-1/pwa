var CACHE_NAME = 'cache-v1';
var filesToCache = [
  '/pwa',
  '/pwa/index.html',
  '/pwa/weather.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    //キャッシュの中に必要なリソースを格納する
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

//有効化状態のイベント処理
self.addEventListener('activate', function(event) {
  event.waitUntil(
    //現在のキャッシュをすべて取得する
    caches.keys().then(function(cache) {
      //新しいキャッシュ以外は削除する
      cache.map(function(name) {
        if (CACHE_NAME !== name) {
          caches.delete(name);
        }
      })
    })

  );
});

//リクエスト取得状態のイベント処理
self.addEventListener('fetch', function(event) {
  event.respondWith(
    //リクエストに応じたリソースがキャッシュにあればそれを使う
    caches.match(event.request).then(function(res) {
        if (res) {
          return res;
        }
        return fetch(event.request);
    })

  );
});

// PUSH 通知の受け取り
self.addEventListener("push", function(event) {
  console.log("Push Notification Recieved", event);
  if (Notification.permission == "granted") {
    event.waitUntil(
      self.registration
        .showNotification("受信しました", {
          body: "お知らせです。",
          icon: "iconV2.png"
        })
        .then(
          function(showEvent) {},
          function(error) {
            console.log(error);
          }
        )
    );
  }
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(
    console.log('notificationclick')
  );
});
