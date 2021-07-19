require('dotenv').config();
const twit = require('twit');

const twitterClient = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = {
  createTweet: (tweetText) => {
    return new Promise((resolve, reject) => {
      twitterClient.post('statuses/update', { status: tweetText }, (err, data, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  createTweetWithMedia: (tweetText, media) => {
    return new Promise((resolve, reject) => {
      twitterClient.post('statuses/update_with_media', { status: tweetText, media_ids: media }, (err, data, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  retweet: (tweetId) => {
    return new Promise((resolve, reject) => {
      twitterClient.post('statuses/retweet/:id', { id: tweetId }, (err, data, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
};