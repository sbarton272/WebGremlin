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
				console.log('Unrecognized animation type ' + animation.type);
				break;
		}
	},

	// TODO create div for sprite, add sprite to body
	// TODO animate sprite (per animation)

	//----------- Animations -----------------------

	// In place animation
	runInPlace: function(animation) {
		// TODO
	},

	// Move across screen in straight line
	runMove: function(animation) {
		console.log(MOVEMENT);
	}


};

//---------------------------------------------
// Run
//---------------------------------------------
