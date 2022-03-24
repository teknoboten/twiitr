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

  const $textarea = $('#tweet-text');
  $textarea.val('');

  for (const tweet in tweetData) {
    const $tweet = createTweetElement(tweetData[tweet]);
    // $container.append($tweet);
    $container.prepend($tweet);
  }
};

const loadTweets = () => {

    $.ajax('/tweets').then((response) => {
      renderTweets(response);
    });

};

const validateForm = () => {
  const text = $("textarea#tweet-text").val();
  
  if (text === "") {
    return "I can't post an empty twiit";
  }

  if (text.length > 140) {
    return "Your twiit is too long";
  }
  return false;
};


$(() => {
  loadTweets();
  const $form = $('form');

  //submit event handler
  $form.on("submit", function(event) {
    event.preventDefault();
        
    if (validateForm()) {
      return alert(validateForm());
    }
    
    const serialized = $(this).serialize();
    
    $.post('/tweets', serialized).then(loadTweets());
  });
});

