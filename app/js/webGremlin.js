/* Web Gremlin
* Tartan Hacks 2015
* CMU
* Carson, Adam, Billy and Spencer
*/

//---------------------------------------------
// Gremlin engine
//---------------------------------------------

function WebGremlin() {

    // Constants
    this.MAX_DELAY = 1000;

    this.AE = new AnimationEngine();

    // Perform actions randomly
    this.start = function() {
        console.log('Your web gremlin is awake');
        console.log(this.AE);
        
        // Action after certain delay
        var delayMs = Math.floor(Math.random() * this.MAX_DELAY);
        setTimeout(function() {
            this.AE.animate({'type':this.AE.IN_PALCE});
        }.bind(this), delayMs);
        
    };
};

//---------------------------------------------
// Animation engine
//---------------------------------------------

function AnimationEngine() {

    //----------- Constants -----------------------

    this.Z_SCORE = 9999999;

    // Defined animations
    this.MOVEMENT = "ANIMATION_MOVE";
    this.IN_PALCE = "ANIMATION_IN_PLACE";

    //----------- Actions -----------------------

    // Animation object used to play animation 
    this.animate = function(animation) {

        // Case on animation type
        switch(animation.type) {
            case this.MOVEMENT:
                this.runMove(animation);
                break;
            case this.IN_PALCE:
                this.runInPlace(animation);
                break;
            default:
                console.log('Unrecognized animation type [' +
                    animation.type + ']');
                break;
        }
    };

    //----------- Animations -----------------------
    // animation needs:
    // - url
    // - width
    // - height
    // - no_of_frames

    // In place animation
    this.runInPlace = function(animation) {
        // TODO remove hard coding
        var topPerc = Math.floor(Math.random() * 80) + 10;
        var leftPerc = Math.floor(Math.random() * 80) + 10;
        var $sprite = this.drawSprite('180px', '123px', topPerc+'%',
            leftPerc+'%', 'img/bird.png')
        $sprite.sprite({fps: 12, no_of_frames: 3});
    };

    // Move across screen in straight line
    this.runMove = function(animation) {
        console.log(this.MOVEMENT);
    };

    //----------- Drawing -----------------------

    /*
     * PARAMS:
     *   width   (str) width of base animation frame
     *   height  (str) height of base animation frame
     *   posTop  (str) position of top of div
     *   posLeft (str) position of left of div
     *   backgroundImg (str) file path
     * RETURNS:
     *   spriteObject
     */
    this.drawSprite = function(width, height, posTop, posLeft, backgroundImg) {

        var url = 'url(' + chrome.extension.getURL(backgroundImg) + ')';

        // Define sprite as div
        var $sprite = $('<div/>', {
            'width': width.toString(),
            'height': height.toString()
        })
        .css({
            'position': 'absolute',
            'top': topPerc,
            'left': leftPerc,
            'background-image': url,
            'background-repeat': 'no-repeat',
            'background-color': 'transparent',
            'z-index': this.Z_SCORE
        });
        $('body').append($sprite);

        return $sprite;
    }

};

//---------------------------------------------
// Run
//---------------------------------------------

var webGremlin = new WebGremlin();
webGremlin.start();
