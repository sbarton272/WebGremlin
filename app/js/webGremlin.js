/* Web Gremlin
* Tartan Hacks 2015
* CMU
* Carson, Adam, Billy and Spencer
*/

//---------------------------------------------
// Gremlin engine
//---------------------------------------------

var WebGremlin = {
    aE: AnimationEngine,
};

//---------------------------------------------
// Animation engine
//---------------------------------------------

var AnimationEngine = {
    // Defined animations
    MOVEMENT: "ANIMATION_MOVE",

    // Animation object used to play animation 
    animate: function(animation) {

         // Case on animation type
         switch(animation.type) {
            case MOVEMENT:
                this.runMove(animation);
                break;
            default:
                console.log('Unrecognized animation type '+animation.type);
                break;
        }
    },

    // TODO create div for sprite, add sprite to body
    // TODO animate sprite (per animation)

    //----------- Animations -----------------------
    // animation needs:
    // - url
    // - width
    // - height
    // - no_of_frames

    // In place animation
    runInPlace: function(animation) {
        var topPerc = Math.floor(Math.random() * 80) + 10;
        var leftPerc = Math.floor(Math.random() * 80) + 10;
        var $sprite = $('<div/>', {
            'id':'gremline',
        })
        .css({
            'position':'absolute',
            'top':String(topPerc) + '%',
            'left':String(leftPerc) + '%',
            'background-image':animtion.url,
            'background-repeat':'no-repeat',
            'background-color':'transparent',
            'z-index':'10000'
        });
        $('body').append($sprite);
        $sprite.sprite({fps: 12, no_of_frames: animation.no_of_frames});
    },

    // Move across screen in straight line
    runMove: function(animation) {
        console.log(MOVEMENT);
    }
};

//---------------------------------------------
// Run
//---------------------------------------------
