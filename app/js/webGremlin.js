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
    this.IN_PLACE = "ANIMATION_IN_PLACE";
    this.DRAGGABLE = "ANIMATION_DRAGGABLE";

    //----------- Actions -----------------------

    // Animation object used to play animation 
    this.animate = function(animation) {

        // Case on animation type
        switch(animation.type) {
            case this.MOVEMENT:
                this.runMove(animation);
                break;
            case this.IN_PLACE:
                this.runInPlace(animation);
                break;
            case this.DRAGGABLE:
                this.runDraggable(animation);
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
        this.animateSprite($sprite, animation);
        this.playSound(animation);
    };

    // Move across screen in straight line
    this.runMove = function(animation) {

        var topPerc = Math.floor(Math.random() * 80) + 10;
        var leftPerc = Math.floor(Math.random() * 80) + 10;
        var $sprite = this.drawSprite(animation.width, animation.height,
            topPerc+'%', leftPerc+'%', animation.img);
        this.animateSprite($sprite, animation);
        $sprite.spStart();
        var tSpd = 0;
        var lSpd = 0;

        while (topPerc > -10 && topPerc < 100 && leftPerc > -10 && leftPerc < 100) 
        {
            var tA = Math.floor(Math.random() * 9);
            var lA = Math.floor(Math.random() * 9);
            tSpd = tSpd-4+tA;
            lSpd = lSpd-4+lA;
            topPerc += tSpd;
            leftPerc += lSpd;
            $sprite.animate({top:topPerc+'%', left:leftPerc+'%'}, 1000);
        }

        this.playSound(animation);
    };

    // Drag around animation
    this.runDraggable = function(animation) {

        var $sprite = this.drawSprite(animation.width, animation.height,
            '50px', '50px', animation.img);

        this.animateSprite($sprite, animation);
        $sprite.isDraggable({
            start: function() {
                // Fade sprite to 70% opacity when at the start of the drag
                $sprite.fadeTo('fast', 0.7);
            },
            stop: function() {
                // Return sprite to 100% opacity when finished
                $sprite.fadeTo('fast', 1);
            },
            drag: function() {
                // This event will fire constantly whilst the object is being dragged
            }
        });
    };

    //----------- Animation Helpers -----------------------

    this.animateSprite = function(sprt, animation, onFirstFrame, onLastFrame) {
        sprt.sprite({
            fps: animation.fps,
            no_of_frames: animation.no_of_frames,
            play_frames: animation.play_frames, // Finite number of frames to run
            on_frame: animation.on_frame,
            on_first_frame: onFirstFrame,
            on_last_frame: onLastFrame
        });

    }

    //------------Playing Sound------------------

    this.playSound = function(animation) {
        if (animation.sound) {
            var sound = chrome.extension.getURL(animation.sound);
            (new buzz.sound(sound)).play();
        }
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
    };

};

//---------------------------------------------
// Run
//---------------------------------------------

var webGremlin = new WebGremlin(ANIMATIONS);
webGremlin.start();
