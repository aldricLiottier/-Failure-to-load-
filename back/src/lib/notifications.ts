const subscriptions = {};
const webpush = require("web-push");

const vapidKeys = {
  privateKey: "bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU",
  publicKey: "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8"
};

webpush.setVapidDetails("mailto:lucas.chaillou50@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);

export function sendPushNotification(pushSubscription, articleId) {
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "Nouvel article disponible",
        text: "Un créateur que vous suivez vient de poster un article",
        tag: "new-article",
        url: "/article/" + articleId.toString(),
        action: "open_url",
      })
    )
    .catch(err => {
      console.log(err);
    });
}