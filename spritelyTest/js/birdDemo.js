// Bird Demo

var $bird = $('<div/>', {
	'id': 'bird',
    'background': 'transparent url(img/bird.png) 0 0 no-repeat',
    'position': 'absolute',
    'top': '150px',
    'left': '65px',
    'width': '180px',
    'height': '123px',
    'z-index': '2000',
    'cursor': 'pointer'
});
$('body').append($bird);


console.log($('#bird'));
console.log($bird);


$('#bird').sprite({fps: 12, no_of_frames: 3})
    .spRandom({
        top: 70,
        left: 100,
        right: 200,
        bottom: 340,
        speed: 4000,
        pause: 3000
});

/*
$('#bird').sprite({fps: 12, no_of_frames: 3})
    .moveTo(100,100);
*/



console.log('Injected bird');
