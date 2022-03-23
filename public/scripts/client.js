//fake tweet data
//   const tweetData = [
//     {
//     "user": {
//       "name": "Alexis Rose",
//       "avatars": "http://localhost:8080/images/profile-hex.png",
//         "handle": "@alittlebitalexis"
//       },
//     "content": {
//         "text": "I'm expensive sushi, I'm a cute huge yacht. I'm a little bit single, even when I'm not."
//       },
//     "created_at": 1647951611232
//  },
//  {
//   "user": {
//     "name": "Alexis Rose",
//     "avatars": "http://localhost:8080/images/profile-hex.png",
//       "handle": "@alittlebitalexis"
//     },
//   "content": {
//       "text": "Hide your diamonds, hide your exes, I'm a little bit Alexis"
//     },
//   "created_at": 1647981611232
// },
// {
//   "user": {
//     "name": "Alexis Rose",
//     "avatars": "http://localhost:8080/images/profile-hex.png",
//       "handle": "@alittlebitalexis"
//     },
//   "content": {
//       "text": "Hide your diamonds, hide your exes, I'm a little bit Alexis"
//     },
//   "created_at": 1647991614232
// }

  // ]

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

const renderTweets = (tweetData) => {
  const $container = $('#tweetscontainer');
  $container.empty();

  for (const tweet in tweetData){
    const $tweet = createTweetElement(tweetData[tweet]);
    $container.append($tweet);
  }

};

const loadTweets = () => {

  //make a jquery GET request to /tweets
  //it will handle a JSON response containing an array
  $.ajax('/tweets').then((response) => {
    // return response;







    
  })

}

$(() => {
  // renderTweets(tweetData);
  loadTweets();
  
  const $form = $('form');

  $form.on("submit", function(event) {
    event.preventDefault(); //when the form is submitted, prevent the page from reloading (default behaviour)
        const serialized = $(this).serialize(); //.this === event.target

    $.post('/tweets', serialized).then((response) => {  
    // renderTweets(tweetData);
      loadTweets();
    })

    // loadTweets();
  })


});


//TIL 'shadow' is when you have two variables in different scopes with the same name... one is overwritten 