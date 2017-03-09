// Initialize Phaser, and create a 800x480px game
var screenWidth = 800;
var game = new Phaser.Game(screenWidth, 480, Phaser.CANVAS, 'gameContainer');

var updatesCounter = 0;
var caughtPokemons = 0;
var text = null;

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() {
    	game.load.crossOrigin = 'anonymous';
      	
      	// Load all needed images
      	game.load.image('background', 'http://d4k.wwilk.com/assets/pokemon_background2.png');
      	game.load.image('pokemon', 'http://d4k.wwilk.com/assets/charmander.png');
    },

    create: function() {
      	// Set the background image
    	game.add.tileSprite(0, 0, 800, 480, 'background');  
    	// Set the physics system
     	game.physics.startSystem(Phaser.Physics.ARCADE);
     
     	// Create text container and set it to initial value
     	text = game.add.text(0, 0, 'Please click on a pokemon', { fill: '#ffffff'});
    },
     
    update: function() {
		updatesCounter++;
		// Create pokemon only every 100th call of update function
        if(updatesCounter % 100 == 0){
	     	createPokemon();    
        }
    }

};

function createPokemon() {
		// Select initial x position of the pokemon randomly
     	var horizontalPosition = parseInt(screenWidth * Math.random());
		var verticalPosition = 0;

     	// Display the monster on the screen
     	var pokemon = game.add.sprite(horizontalPosition, verticalPosition, 'pokemon');

		//  Enables all kind of input actions on this image (click, etc)
    	pokemon.inputEnabled = true;
		
		pokemon.events.onInputDown.add(function(){
      		caughtPokemons++;
      		text.text = 'Congratulations, you caught ' + caughtPokemons + ' pokemons';
      		pokemon.destroy();
      	}, this);

     	// Add gravity to the pokemon to make it fall
     	game.physics.arcade.enable(pokemon);
     	pokemon.body.gravity.y = 1000;
	}

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');

