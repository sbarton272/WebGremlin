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

    this.animations = animations;

    var actions = [
        'inplace_gremlin',
        'move_gremlin',
        'tribbles'
    ];

    //----------- Methods -----------------------

    // Perform actions randomly
    this.start = function() {
        var act = Math.floor(Math.random() * actions.length);
        console.log('Your web gremlin is awake');
        console.log(actions[act]);

        // Action after certain delay
        var delayMs = Math.floor(Math.random() * this.MAX_DELAY);
        setTimeout(function() {
            // this.AE.animate(this.animations[actions[act]]);
            this.AE.animate(this.animations['multi_inplace_bird']);
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
    this.TRIBBLES = "TRIBBLES";

    //----------- Actions -----------------------

    // Animation object used to play animation 
    this.animate = function(animation) {

        if ($.isArray(animation)) {

            // Multiple steps            
            this.runSteps(animation, 0);

        } else {

            // Single step
            this.runStep(animation, function(sprite) {
                console.log("Done single step animation");
                
                this.removeSprite(sprite);

            }.bind(this));
        }
    };

    this.runSteps = function(animation, stepI) {
        
        // Run steps until end
        this.runStep(animation[stepI], function(sprite) {

            console.log('Just ran step ' + stepI);
            stepI++;

            // Remove prior sprite every time
            this.removeSprite(sprite);

            if (animation.length > stepI) {
                // Run next step
                this.runSteps(animation, stepI);
            } else {
                console.log("Done multi step animation");
            }

        }.bind(this));
    
    }

    this.runStep = function(animation, onFinalFrame) {

        // Create sprite div, once per step as may have different animation
        var $sprite = this.drawSprite(animation.width, animation.height,
            animation.img);

        // Case on animation type
        switch(animation.type) {
            case this.MOVEMENT:
                this.runMove($sprite, animation, onFinalFrame);
                break;
            case this.IN_PALCE:
                this.runInPlace($sprite, animation, onFinalFrame);
                break;
            case this.DRAGGABLE:
                this.runDraggable($sprite, animation, onFinalFrame);
                break;
            case this.TRIBBLES:
                // TODO move to helper
                var timeout = Math.floor(Math.random() * 10000) + 2000;
                setTimeout(function() { 
                    this.runTribbles(animation, timeout, 0); 
                }.bind(this), timeout);
                break;
            default:
                console.log('Unrecognized animation type [' +
                    animation.type + ']');
                break;
        }
    }

    //----------- Animations -----------------------

    // In place animation
    this.runInPlace = function(sprite, animation, onFinalFrame) {
    
        // Decide location        
        var topPerc = Math.floor(Math.random() * 80) + 10;
        var leftPerc = Math.floor(Math.random() * 80) + 10;
        
        // Animate
        this.setSpritePos(sprite, topPerc + '%', leftPerc + '%');
        this.animateSprite(sprite, animation);

        // Set stop time
        setTimeout(function() {
            
            onFinalFrame(sprite);

        }.bind(this), animation['duration']);
        
    };

    // Move across screen in straight line
    this.runMove = function(sprite, animation, onFinalFrame) {

        var topPerc = Math.floor(Math.random() * 80) + 10;
        var leftPerc = 100;//Math.floor(Math.random() * 80) + 10;
        var $sprite = this.drawSprite(animation.width, animation.height,
            topPerc+'%', leftPerc+'%', animation.img);
        this.animateSprite($sprite, animation);
        $sprite.spStart();
        $sprite.spRandom({top:0, left:0, right:400, bottom:1000, speed:3500,pause:1000});
        var tSpd = 0;
        var lSpd = -3;

        this.playSound(animation);
        $sprite.animate({top:topPerc+'%', left:'-20%'}, 10000);

        // TODO onFinalFrame

    };

    // Drag around animation
    this.runDraggable = function(sprite, animation, onFinalFrame) {

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
                this.playSound(animation);
            }.bind(this),
            drag: function() {
                // This event will fire constantly whilst the object is being dragged
            }
        });

        // TODO onFinalFrame

    };

    // Replaces images
    this.runTribbles = function(animation, timeout, i) {
        var ourimages = [
            'basic.png','big-poof.png','peeking.png',
            'small-poof.png'
        ];
        var myid = chrome.runtime.id;
        var images = document.getElementsByTagName('img');
        var changeIdx = Math.floor(Math.random() * images.length);
        var useIdx = Math.floor(Math.random() * ourimages.length);
        var myimg = chrome.extension.getURL('res/img/' + ourimages[useIdx]);
        images[changeIdx].src = myimg;
        if (timeout > 200) {
            this.playSound(animation);
        }

        if (i < 3*images.length) {
            setTimeout( function() { 
                this.runTribbles(animation, (9*timeout/10)+1, i+1); 
            }.bind(this), timeout);
        }
    }

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
        var url = chrome.extension.getURL(animation.sound);
        var sound = new buzz.sound(url);
        sound.play();
        return sound;
    }

    // TODO loop, stop

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
    this.drawSprite = function(width, height, backgroundImg) {

        var url = 'url(' + chrome.extension.getURL(backgroundImg) + ')';

        // Define sprite as div
        var $sprite = $('<div/>', {
            'width': width.toString(),
            'height': height.toString()
        })
        .css({
            'cursor':'pointer',
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'background-image': url,
            'background-repeat': 'no-repeat',
            'background-color': 'transparent',
            'z-index': this.Z_SCORE
        })
        $('body').append($sprite);

        return $sprite;
    };

    this.setSpritePos = function(sprite, posTop, posLeft) {
        sprite.css({
            'top': posTop,
            'left': posLeft,
        })
    }

    this.removeSprite = function(sprite) {

        // Remove animation and div
        sprite.destroy();
        sprite.remove();

        // TODO remove audio
    }

};

//---------------------------------------------
// Run
//---------------------------------------------

var webGremlin = new WebGremlin(ANIMATIONS);
webGremlin.start();
