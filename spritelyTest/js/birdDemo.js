// Bird Demo

var $bird = $('<div/>', {
	'id': 'bird',
    'background-image': chrome.extension.getURL('img/bird.png'),
    'background-repeat': 'no-repeat',
    'background-color': 'transparent',
    'background-position': '0 0',
    'position': 'absolute',
    'width': '180px',
    'height': '123px',
    'z-index': '2000',
});
$('body').append($bird);

console.log($bird);

$bird.sprite({fps: 1, no_of_frames: 3});

console.log('Injected bird');
