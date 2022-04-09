import { useEffect, useState } from "react"

function App() {
  const [tweets, setTweets] = useState()
  useEffect(() => {
    fetch("/api/tweets")
      .then(res => res.json())
      .then(res => {
        let tweets = []
        for (let key in res) {
          if (key == "fetchTime" || key == "isEmpty") continue
          const twt = res[key]
          if (twt.includes("#SaveSoil") || twt.includes("#cpsavesoil") || twt.includes("savesoil"))
            tweets.push({ id: key, tweet: res[key] })
        }
        console.log(tweets)
        setTweets(tweets)
      })
      .catch(err => console.error(err))
  }, [])
  return (
    <>
      <h1>Twitter support for save soil</h1>
      <ul>
        {tweets && tweets.map((t, idx) =>
          <>
            <br />
            <br />
            <br />
            <li>
              <a href={"https://twitter.com/SadhguruJV/status/" + t.id}>{t.tweet}</a>
            </li>
          </>
        )}
      </ul>
    </>
  )
}

export default App
