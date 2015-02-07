// Bird Demo

var $bird = $('<div/>', {
	'id': 'bird',
    'width': '180px',
    'height': '123px',
    'z-index': '2000',
})
.css({
    'position': 'absolute',
    'top': '20px',
    'left': '20px',
    'background-image':'url(img/bird.png)', //chrome.extension.getURL('img/bird.png'),
    'background-repeat': 'no-repeat',
    'background-color': 'transparent'
});

// Add to body
$('body').append($bird);

console.log($bird);

$bird.sprite({fps: 12, no_of_frames: 3});

console.log('Injected bird');
