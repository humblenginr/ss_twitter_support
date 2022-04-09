const express = require('express')
const { TwitterApi } = require('twitter-api-v2');
const app = express()
const port = 3000

const localCache = {
  isEmpty: true,
  fetchTime: false
}


app.use(express.static('ui/dist'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/api/tweets', async (req, res) => {
  const client = new TwitterApi("AAAAAAAAAAAAAAAAAAAAAPAvbQEAAAAASHnzduUEKUlTPZdmIv67D72gKF8%3Dtck2VX80acPGA8TJ35XwACgR54cqwbWnejDNfUXRPgzU4Jdx7y");
  // either there is no cache or the last fetch has been done before three hours
  if (localCache.isEmpty || ((Date.now() - localCache.fetchTime) / 60000) > 60) {
    const fetchedTweets = await client.v2.userTimeline('67611162', { exclude: 'replies' })
    console.log(fetchedTweets)
    for (const tweet of fetchedTweets) {
      localCache[tweet.id] = tweet.text
    }
    localCache.isEmpty = false
    localCache.fetchTime = Date.now()
  }
  res.json(localCache)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
