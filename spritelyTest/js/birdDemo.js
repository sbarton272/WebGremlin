// Bird Demo

var myid = chrome.runtime.id;
var url = 'url(' + chrome.extension.getURL('img/bird.png') + ')';

var $bird = $('<div/>', {
	'id': 'bird',
    'width': '180px',
    'height': '123px'
})
.css({
    'position': 'absolute',
    'top': '20px',
    'left': '20px',
    'background-image':url,
    'background-repeat': 'no-repeat',
    'background-color': 'transparent',
    'z-index':'1103'
});

// Add to body
$('body').append($bird);

console.log($bird);

$bird.sprite({fps: 12, no_of_frames: 3});
