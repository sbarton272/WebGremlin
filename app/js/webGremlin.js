/* Web Gremlin
* Tartan Hacks 2015
* CMU
* Carson, Adam, Billy and Spencer
*/

//---------------------------------------------
// Gremlin engine
//---------------------------------------------

function WebGremlin(animations) {

    //----------- Constants -----------------------

    // Constants
    this.MAX_DELAY = 10*1000;
    this.MIN_DELAY = 1*1000;

    this.AE = new AnimationEngine();

    this.animations = animations;

    var actions = [
        'whistle_gremlin',
        'running_gremlin',
        'tribbles'
    ];

    //----------- Methods -----------------------

    // Perform actions randomly
    this.start = function() {

        console.log('Your web gremlin is awake');
        this.performRandAnimations(this.MIN_DELAY, this.MAX_DELAY);
        //this.AE.animate(this.animations[actions[0]]);
    };

    this.performRandAnimations = function(minDelay, maxDelay) {
        
        // TODO finish, have callback
        // TODO end on tribble

        // Select random action
        var act = Math.floor(Math.random() * actions.length);

        // Action after certain delay
        var delayMs = Math.floor(Math.random() * (maxDelay - minDelay)
            + minDelay);

        setTimeout(function() {
            
            // Animate and call again
            console.log('Performing: ' + actions[act]);

            this.AE.animate(this.animations[actions[act]], function() {
                
                // Continue performing actions
                this.performRandAnimations(minDelay, maxDelay);
            }.bind(this));

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
    this.TRIBBLES = "TRIBBLES";

    //----------- Actions -----------------------

    // Animation object used to play animation 
    this.animate = function(animation, cb) {

        if ($.isArray(animation)) {

            // Multiple steps            
            this.runSteps(animation, 0, cb);

        } else {

            // Single step
            this.runStep(animation, function(sprite) {
                console.log("Done single step animation");
                
                this.removeSprite(sprite);
                cb();

            }.bind(this));
        }
    };

    this.runSteps = function(animation, stepI, cb) {
        
        // Run steps until end
        this.runStep(animation[stepI], function(sprite) {

            console.log('Just ran step ' + stepI);
            stepI++;

            // Remove prior sprite every time
            this.removeSprite(sprite);

            if (animation.length > stepI) {
                
                // Run next step
                this.runSteps(animation, stepI, cb);
            } else {
                
                // Complete so go onto callback
                console.log("Done multi step animation");
                cb();
            }

        }.bind(this));
    
    }

    this.runStep = function(animation, onFinalFrame) {

        // Create sprite div, once per step as may have different animation
        if (animation.img) {
            var $sprite = this.drawSprite(animation.width, animation.height,
                animation.img);
        }

        // Case on animation type
        switch(animation.type) {
            case this.MOVEMENT:
                this.runMove($sprite, animation, onFinalFrame);
                break;
            case this.IN_PLACE:
                this.runInPlace($sprite, animation, onFinalFrame);
                break;
            case this.TRIBBLES:
                this.runTribbles(animation);
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

        // Play audio
        sprite.sound = this.loopSound(animation);

        // Set stop time
        setTimeout(function() {
            onFinalFrame(sprite);
        }.bind(this), animation['duration']);
        
    };

    // Move across screen in straight line
    this.runMove = function(sprite, animation, onFinalFrame) {

        // Set div
        var topPerc = Math.floor(Math.random() * 80) + 10;
        var leftPerc = 100;
        this.setSpritePos(sprite, topPerc+'%', leftPerc+'%');
        
        // Animate
        this.animateSprite(sprite, animation);
        sprite.spStart();
        sprite.spRandom({top:0, left:0, right:400, bottom:1000, speed:3500,pause:1000});

        // Move
        sprite.animate({top:topPerc+'%', left:'-20%'}, animation['duration']);

        // Play audio
        sprite.sound = this.loopSound(animation);

        // Set stop time
        setTimeout(function() {
            onFinalFrame(sprite);
        }.bind(this), animation['duration']);
    };

    // Replaces images
    // NOTE cannot run in multi-step and does not continue
    this.runTribbles = function(animation) {
        var timeout = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(function() { 
            this.recurseTribbles(animation, timeout, 0, Date.now()); 
        }.bind(this), timeout);
    }

    this.recurseTribbles = function(animation, timeout, i, last) {
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
        var now = Date.now();
        if (now - last >= 100 ) {
            this.playSound(animation);
        }
        

        if (i < 3*images.length) {
            setTimeout( function() { 
                this.recurseTribbles(animation, (9*timeout/10)+1, i+1,now); 
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
        if (animation.sound) {
            var url = chrome.extension.getURL(animation.sound);
            var sound = new buzz.sound(url);
            sound.play();
            return sound;
        }
    }

    this.loopSound = function(animation) {
        if (animation.sound) {
            var url = chrome.extension.getURL(animation.sound);
            var sound = new buzz.sound(url);
            sound.loop();
            sound.play();
            return sound;
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

        // Remove audio
        if (sprite.sound) {
            sprite.sound.stop();
        }
    }

};

//---------------------------------------------
// Run
//---------------------------------------------

var webGremlin = new WebGremlin(ANIMATIONS);
webGremlin.start();
