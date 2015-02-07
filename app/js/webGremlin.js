/* Web Gremlin
* Tartan Hacks 2015
* CMU
* Carson, Adam, Billy and Spencer
*/

// TODO 
// add audio
// 

//---------------------------------------------
// Gremlin engine
//---------------------------------------------

function WebGremlin(animations) {

    //----------- Constants -----------------------

    // Constants
    this.MAX_DELAY = 1000;

    this.AE = new AnimationEngine();

    // Load animations
    // TODO move animations folder elsewhere
    this.animations = animations;

    //----------- Methods -----------------------

    // Perform actions randomly
    this.start = function() {
        console.log('Your web gremlin is awake');

        // Action after certain delay
        var delayMs = Math.floor(Math.random() * this.MAX_DELAY);
        setTimeout(function() {
            // TODO load 
            this.AE.animate(this.animations['move_bird']);
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

    // In place animation
    this.runInPlace = function(animation) {
        
        var topPerc = Math.floor(Math.random() * 80) + 10;
        var leftPerc = Math.floor(Math.random() * 80) + 10;
        
        var $sprite = this.drawSprite(animation.width, animation.height,
            topPerc+'%', leftPerc+'%', animation.img);
        $sprite.sprite({fps: animation.fps, no_of_frames: animation.no_of_frames});

        this.playSound(animation);
    };

    // Move across screen in straight line
    this.runMove = function(animation) {


        var topPerc = Math.floor(Math.random() * 80) + 10;
        var leftPerc = Math.floor(Math.random() * 80) + 10;
        var $sprite = this.drawSprite(animation.width, animation.height,
            topPerc+'%', leftPerc+'%', animation.img);
        $sprite.sprite({fps: animation.fps, no_of_frames: animation.no_of_frames});
        $sprite.spStart();
        $sprite.spRandom({top:0, left:0, right:400, bottom:1000, speed:3500,pause:1000});
        $sprite.spChangeDir('left');
        $sprite.isDraggable({});

        this.playSound(animation);

    };

    //------------Playing Sound------------------
    this.playSound = function(animation) {
        var sound = chrome.extension.getURL(animation.sound);
        (new buzz.sound(sound)).play();
    }

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
            'cursor':'pointer',
            'position': 'absolute',
            'top': posTop,
            'left': posLeft,
            'background-image': url,
            'background-repeat': 'no-repeat',
            'background-color': 'transparent',
            'z-index': this.Z_SCORE
        })
        $('body').append($sprite);

        return $sprite;
    }

};

//---------------------------------------------
// Run
//---------------------------------------------

var webGremlin = new WebGremlin(ANIMATIONS);
webGremlin.start();
