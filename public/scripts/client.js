//fake tweet data
  const tweetData = {
    "user": {
      "name": "Alexis Rose",
      "avatars": "http://localhost:8080/images/profile-hex.png",
        "handle": "@alittlebitalexis"
      },
    "content": {
        "text": "I'm expensive sushi, I'm a cute huge yacht. I'm a little bit single, even when I'm not."
      },
    "created_at": 1461116232227
 }

 const createTweetElement = (tweetData) => {
  const ago = timeago.format(tweetData.created_at);
  const element = `
  <article>
  <header>
    <div>
      <img src="${tweetData.user.avatars}">
      <span>${tweetData.user.name}</span>

    </div>

    <div> <a href="#">${tweetData.user.handle}</a></div>
  </header>

  <div>
    <p>${tweetData.content.text}</p>
  </div>

  <footer>
    <div>
      <a href="#">${ago}</a>
    </div>
    <div>
      <a href="#"><i class="fa-solid fa-flag"></i></a>
      <a href="#"><i class="fa-solid fa-retweet"></i></a>
      <a href="#"><i class="fa-solid fa-fire"></i></a>
    </div>
  </footer>

</article>
`;
  return element;
}

//document.ready() ensures the script does not run until the DOM is fully loaded
$(() => {

const $tweet = createTweetElement(tweetData);
const container = $('#tweetscontainer');
container.append($tweet);

});


