/*
 * The glow runner application.
 */
function GlowRunner(){
	
	//Our globally accessible variables
	canvas = 	document.getElementById('glow-runner');
	context = 	canvas.getContext("2d");
	ticks = 	0;
	sound = 	new SoundManager('assets/sounds', 100);
	
	//Our application variables
	var framerate = 35;

	//Get the various models for our application
	var room = new Room();
	var menu = new Menu();

	//Set the initial state of our application
	state = room; 

	//Create a variable which will become this
	var _this;
	
	//Set the width and height of our game
	context.canvas.width  = 800;
	context.canvas.height = 400;
	
	//Perform setup tasks
	(function(){
	
		//Start playing background music
		sound.play('background');
		
	})();
	
	return {

		//Run the core code of the game
		tick : function(){

			//Clear the game room
			this.clear();
			
			//Make the room work
			state.tick();
		
			//Keep our global tick count rockin' 
			ticks++;
		
		},
		//Handle tick and framerate
		start : function(game){
			
			//Define _this
			if(typeof _this == 'undefined')
				_this = this;

			//Time the frame started
			var frameStart = (new Date).getTime();			
			
			//Render the next frame
			_this.tick();

			//Get the time taken for the frame to execute
			var frameTime = (new Date).getTime() - frameStart;

			//Set the next timeout based on the time we took
			var nextTimeout = (frameTime > (1000 / framerate))
				? 0
				: (1000 / framerate) - frameTime;
					
			setTimeout(_this.start, nextTimeout);		
		},
		
		//Clear the canvas context for later user
		clear : function(){

			//Refresh the canvas
			context.clearRect(
				0,
				0,
				context.canvas.width,
				context.canvas.height
			);
		}
	};
}


//Start the game when the window loads
window.onload = function(){
	(new GlowRunner()).start();
}

