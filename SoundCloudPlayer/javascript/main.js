/* 1. Search */
/*
document.querySelector(". ui massive icon input").addEventListener('click', function(){

 var search = document.querySelector("input").value
 console.log(search)
 SoundCloudAPI.getTracks(search) 


})

*/






/* 2. Query SoundCloud API */

var SoundCloudAPI = {};
SoundCloudAPI.init = function() {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
      });
}
SoundCloudAPI.init();

SoundCloudAPI.getTracks = function(inputValue) {
SC.get('/tracks', {
    q: inputValue
  }).then(function(tracks) {
    console.log(tracks);
    SoundCloudAPI.renderTracks(tracks)
  });
}

SoundCloudAPI.getTracks();



/* 3. Display the cards */
SoundCloudAPI.renderTracks = function(tracks) {

  document.querySelector('.js-search-results').innerHTML = ''
  
    tracks.forEach(function(track){



      var card =  document.createElement('div')
      card.classList.add("card")
  
      
      var imageDiv = document.createElement("div")
      imageDiv.classList.add("image")
  
      var image_img = document.createElement("img")
      image_img.classList.add("image_img")
      image_img.src = track.artwork_url || "http://lorempixel.com/100/100/abstract/"
  
      imageDiv.appendChild(image_img)
  
      
      var content = document.createElement("div")
      content.classList.add('content')
  
      var header = document.createElement('div')
      header.classList.add('header')
      header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">'+  track.title + '<a/>'
  
      content.appendChild(header)
  
      var button = document.createElement('div')
      button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button')
  
      var icon = document.createElement('i')
      icon.classList.add('add', 'icon')
  
      var buttonText = document.createElement('span')
      buttonText.innerHTML = 'Add to playlist'
  
      button.addEventListener('click', function(){

          addToPlaylist(track.permalink_url)        

      })
  
      button.appendChild(icon)
      button.appendChild(buttonText)
  
      card.appendChild(imageDiv)
      card.appendChild(content)
      card.appendChild(button)
      
    
      var searchResults = document.querySelector('.js-search-results')
      
      searchResults.appendChild(card)

      
  

    })
} 

/* 4. Add tp playlist and play */


 function addToPlaylist (url) {
  SC.oEmbed(url, {
  auto_play: true
  }).then(function(embed){
      var sideBar = document.querySelector('.js-playlist')
      
      var box = document.createElement('div')
      box.innerHTML  = embed.html

      sideBar.insertBefore(box, sideBar.firstChild)

      localStorage.setItem("key",sideBar.innerHTML)
      


  });
}
var sideBar = document.querySelector(".js-playlist")
sideBar.innerHTML = localStorage.getItem("key")

document.querySelector(".ui").addEventListener('click', function(){
 

  var search = document.querySelector("input").value
  console.log(search)
  SoundCloudAPI.getTracks(search) 
  
 
 
})

document.querySelector(".input").addEventListener('keyup',function(e){
  
  var input = document.querySelector("input").value;

  // if the key ENTER is pressed...
  if(e.which === 13) {
    SoundCloudAPI.getTracks(input) ;
  }

});
