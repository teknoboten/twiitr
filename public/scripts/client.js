const escapeText = (tweetData) => {
  //tweetData.content.text
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(tweetData.content.text));
  return p.innerHTML;
}

const createTweetElement = (tweetData) => {
  const ago = timeago.format(tweetData.created_at);
  const safeTweet = escapeText(tweetData);

  const element = `
  <article>
  <header>
    <div>
      <img src="${tweetData.user.avatars}">
      <div>${tweetData.user.name}</div>

    </div>

    <div> <a href="#">${tweetData.user.handle}</a></div>
  </header>

  <div class="twiitbody">
    ${safeTweet}
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

  const $counter = $("#counter");
  $counter.text(140);

  const $container = $('#tweetscontainer');
  $container.empty();

  const $textarea = $('#tweet-text');
  $textarea.val('');

  for (const tweet in tweetData) {
    const $tweet = createTweetElement(tweetData[tweet]);
    $container.prepend($tweet);
  }
};


const loadTweets = () => {
  $.ajax('/tweets').then((response) => {
    console.log(response);
    renderTweets(response);
  })
};

const validateForm = (autoValidate = false) => {
  const $text = $("textarea#tweet-text").val();
  const $error = $("div.hidden").hide();
  const $section = $(".new-tweet");

  $section.children('div').fadeOut("slow", () => { $(this).remove()});

  if ($text.length > 140 && !autoValidate){
    $error.text("Your twiit is too large!").addClass("error").fadeIn("slow");
    $section.prepend($error);
    return false;
  };

  if (!$text && !autoValidate){
    $error.text(`I can't post an empty twiit!`).addClass("error").fadeIn("slow");
    $section.prepend($error);
    return false;
  }
  return true;
};

const bounceIcon = () => {
  $('.fa-angles-down').hover(
    function(){ $(this).addClass('fa-bounce') },
    function(){ $(this).removeClass('fa-bounce') }
  );
}


$(() => {

  bounceIcon();
  loadTweets();
  const $form = $('form');

  //submit event handler
  $form.on("submit", function(event) {
    event.preventDefault();

    if (validateForm()) {
      const serialized = $(this).serialize();
      $.post('/tweets', serialized).then(loadTweets());
    } 

  });
});






