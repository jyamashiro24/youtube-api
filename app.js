//Our YouTube API Configuration Settings.

const youtube_search_url = 'https://www.googleapis.com/youtube/v3/search';


function getDataFromApi(searchTerm, callback) {
  console.log(searchTerm);
  	const query = {
  	    part: 'snippet, id',
  	    key: 'AIzaSyBSYJVVkoSPkO2S8icdLBqKH9Oxdh3PfgA',
  	    q: `${searchTerm} in:name`,
  	    type: 'video',
        maxResults: 25
      };
	$.getJSON(youtube_search_url, query, function(data) {
	  displayYoutubeSearchData(data);
  });
}


//Rendering to DOM
function renderResult(result) {
  console.log(result);
	return `
    <ul>
      <li>
        <div class="list-left">
          <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.default.url}"></a>
        </div>
        <div class="list-right">
          <h3><a href="https://www.youtube.com/watch?v=${result.id.videoId}"  ${result.snippet.title}" target="_blank">${result.snippet.title}</a></h3>
          <small>By  
          <span class="channelTitle"><a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a></span>
          <br>${result.snippet.publishedAt}</small><br>
          <br><p>${result.snippet.description}</p><br>
        </div>
        <br>
      </li>
      <div class="clearfix"></div>
		</ul>
    <br>
	`;  
}


function displayYoutubeSearchData(data) {
  console.log(data);
	const result = data.items.map((item, index) => renderResult(item));
	$('.js-results').empty().html(result)
}


//Event Listeners
function handleSubmit() {
  console.log("ran handleSubmit()");
  $('.js-search-youtube-form').submit(event => {
    event.preventDefault();
    const query = $('#js-criteria').val();
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(handleSubmit);
