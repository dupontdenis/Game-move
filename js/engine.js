/**************************************************************
 * Purpose: This file contains the functions used to drive the
 *          game engine. It will render the images and detect
 *          collisions.
 *          
 * Author:  Base file from Udacity Nano degree progam
 *          Additional modifications made by Kevin Stachowski.
 * 
 * Date:    10/24/2014
 * Updated: 1/1/2014
 * 
 * Notes:   This file is part of app.js and resources.js
 * Modif : dupont
 * 
 **************************************************************/

/*
 * Purpose: this var contains the engine object
 */
var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        GAME = {width:505,height:606},
        lastTime;
        
    //set the size of the game play area
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    
    //append the canvas to the DOM
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        win.requestAnimationFrame(main);
    };

    function init() {

        reset();
        lastTime = Date.now();
        main();
    }
	
    // enabled checkCollisions function
    function update(dt) {
        updatePlayer(dt);
    }
    
  
/*
     * Purpose:  This update all of the objects with their new values
     *          
     * Pre con:  objects exist
     * Post con: objects have been updated
     */
    function updatePlayer(dt) {
         player.update();
    }

    /*
     * Purpose:  This will draw the background objects on the screen.
     *          
     * Pre con:  resources exits to draw
     * Post con: objects have been drawn.
     */
    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        // draw the background
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        // draw any objects that exist
        renderPlayer();
    }

    /*
     * Purpose:  This will draw all of the sprite objects on the screen.
     *          
     * Pre con:  resources exits to draw
     * Post con: objects have been drawn.
     */
    function renderPlayer() {
        player.render();
    }
    
    /*
     * Purpose:  This will reset all of the objects back to thier starting values.
     *          
     * Pre con:  none
     * Post con: objects have been reset.
     */
    function reset() {
        player = new Player();
    }

    /*
     * Purpose:  This load all of the resources to be used.
     *          
     * Pre con:  files exist
     * Post con: resources are in memory.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/GemOrange.png',
        'images/GemGreen.png'
    ]);
    
    // after the resources have been loaded, start the game
    Resources.onReady(init);

    // make the canvas global
    global.ctx = ctx;
})(this);
