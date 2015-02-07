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
            this.AE.animate(this.animations['drag_bird']);
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
    this.DRAGGABLE = "ANIMATION_DRAGGABLE";

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
    };

    // Move across screen in straight line
    this.runMove = function(animation) {

        var topPerc = Math.floor(Math.random() * 80) + 10;

        var $sprite = this.drawSprite(animation.width, animation.height,
            topPerc+'%', '-50%', animation.img);
        this.animateSprite($sprite, animation);
        $sprite.pan({});

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

    this.animateSprite = function(sprt, animation) {
        sprt.sprite({
            fps: animation.fps,
            no_of_frames: animation.no_of_frames,
            play_frames: animation.play_frames // Finite number of frames to run
        });

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
            'position': 'absolute',
            'top': posTop,
            'left': posLeft,
            'background-image': url,
            'background-repeat': 'no-repeat',
            'background-color': 'transparent',
            'z-index': this.Z_SCORE
        });
        $('body').append($sprite);

        return $sprite;
    };

};

//---------------------------------------------
// Run
//---------------------------------------------

var webGremlin = new WebGremlin(ANIMATIONS);
webGremlin.start();
