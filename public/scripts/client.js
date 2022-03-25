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
      <span>${tweetData.user.name}</span>

    </div>

    <div> <a href="#">${tweetData.user.handle}</a></div>
  </header>

  <div>
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
  $counter.text(0);

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
      renderTweets(response);
    });
};

const validateForm = (autoValidate = false) => {
  const $text = $("textarea#tweet-text").val();
  const $error = $("div.hidden").hide();
  const $section = $(".new-tweet");

  $section.children('div').fadeOut("slow", () => { $(this).remove()});

  if ($text.length > 140 && !autoValidate){
    $error.text("🌦️  Please distill your thoughts into a smaller, more concentrated twiit 🌦️").addClass("error").fadeIn("slow");
    $section.prepend($error);
    return false;
  };

  if (!$text && !autoValidate){
    $error.text(" 💬  The Internet cannot run on empty twiits, please type something and try again 💬 ").addClass("error").fadeIn("slow");
    $section.prepend($error);
    return false;
  }
  return true;
};


$(() => {
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





// const validateForm = () => {
//   const text = $("textarea#tweet-text").val();
//   // const span = $("span#error");
  
//   if (text === "") {
//     return "I can't post an empty twiit";
//     // span.append(document.createTextNode("I can't post an empty twiit"))
//   }

//   if (text.length > 140) {
//     return "Your twiit is too long";
//   }
//   return false;
// };
