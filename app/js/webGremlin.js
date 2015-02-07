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
        
        var delayMs = Math.floor(Math.random() * this.MAX_DELAY); 
        setTimeout(function() {
            this.AE.animate({'type':this.AE.MOVEMENT});
        }.bind(this), delayMs)
        
    };

};

//---------------------------------------------
// Animation engine
//---------------------------------------------

function AnimationEngine() {
    // Defined animations
    this.MOVEMENT = "ANIMATION_MOVE";

    // TODO create div for sprite, add sprite to body
    // TODO animate sprite (per animation)

    //----------- Animations -----------------------

    // Animation object used to play animation 
    this.animate = function(animation) {

        // Case on animation type
        switch(animation.type) {
            case this.MOVEMENT:
                this.runMove(animation);
                break;
            default:
                console.log('Unrecognized animation type [' +
                    animation.type + ']');
                break;
        }
    };

    // In place animation
    this.runInPlace = function(animation) {
        // TODO
    };

    // Move across screen in straight line
    this.runMove = function(animation) {
        console.log(this.MOVEMENT);
    };

}

//---------------------------------------------
// Run
//---------------------------------------------

var webGremlin = new WebGremlin();
webGremlin.start();
