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
};
const renderTweets = (tweetData) => {

  const $container = $('#tweetscontainer');
  $container.empty();

  for (const tweet in tweetData) {
    const $tweet = createTweetElement(tweetData[tweet]);
    $container.append($tweet);
  }
};
const loadTweets = () => {
  $.ajax('/tweets')
    .then(function(response) {
      renderTweets(response);
    });
};


$(() => {
  loadTweets();
  const $form = $('form');

  //submit event handler
  $form.on("submit", function(event) {
    event.preventDefault();                             //when the form is submitted, prevent the page from reloading (default behaviour)
    const serialized = $(this).serialize();             //serialize .this === event.target (aka form data)
    $.post('/tweets', serialized).then(loadTweets());
  });
});
