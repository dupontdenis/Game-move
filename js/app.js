/**************************************************************
 * Purpose: This file contains the functions used to instantiate
 *          the player
 *          
 * Author:  Base file from Udacity Nano degree progam
 *          Additional modifications made by Kevin Stachowski.
 * 
 * Date:    10/24/2014
 * Updated: 1/12/2014
 * 
 * Notes:   This file is part of engine.js and resources.js
 * 
 **************************************************************/

/*
 * Purpose:  This var contains the function that will instantiate
 *           player objects.
 *          
 * Pre con:  none.
 * Post con: A player object has been loaded into memory.
 */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    // Starting coordinates of the player
    this.x = 200;
    this.y = 400;
    
    // these hold buckets of movement that need to be applied.
    // this allows for smoother player movement.
    this.moveX = 0;
    this.moveY = 0;
    
    // the speed modifier of the player.
    this.speed = 5;
}

/*
 * Purpose:  This method contains the function that will handle
 *           the key press events.
 *          
 * Pre con:  none.
 * Post con: if a play is able to move to that location,
 *           the move vars are set to move the player
 *           one square. The play is not actually moved
 *           untill the update method.
 */
Player.prototype.handleInput = function(key) {
    // dont process new movement untill the previous movement is done.
    if(this.moveX !== 0 || this.moveY !== 0)
            return;
    
    // check the bondry, dont let player go off screen.
    if(this.x>300 && key === 'right')
            return;
    if(this.x<100 && key === 'left')
            return;
    if(this.y<100 && key === 'up')
            return;
    if(this.y>359 && key === 'down')
            return;
    
    // set player movement vars
    if(key === 'up')
            this.moveY -= 85;
    if(key === 'down')
            this.moveY += 85;
    if(key === 'left')
            this.moveX -= 100;
    if(key === 'right')
            this.moveX += 100;
}

/*
 * Purpose:  This method contains the function that will update
 *           player object.
 *          
 * Pre con:  This player has been instantiated.
 * Post con: This player instance has been updated.
 *          
 * @param dt - The time dialation of the last update. 
 */
Player.prototype.update = function(dt) {
    // these will move the player a little bit each frame
    if(this.moveX > 0)
    {
        this.x += this.speed;
        this.moveX -= this.speed;
    }
    if(this.moveX < 0)
    {
        this.x -= this.speed;
        this.moveX += this.speed;
    }
    if(this.moveY > 0)
    {
        this.y += this.speed;
        this.moveY -= this.speed;
    }
    if(this.moveY < 0)
    {
        this.y -= this.speed;
        this.moveY += this.speed;
    }
}

/*
 * Purpose:  This method contains the function that will draw
 *           player objects.
 *          
 * Pre con:  This player has been updated.
 * Post con: This player instance has been drawn.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/*
 * Purpose:  This will add a listener to the document
 *           to watch for key up values. If its 
 *           directional, handle the input.
 *          
 * Pre con:  The page has been loaded
 * Post con: Directional kys have been handled.
 */
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // pass the key to the players handleInput method.
    player.handleInput(allowedKeys[e.keyCode]);
    e.preventDefault();
    return false;
});



// instantiate the player.
var player = new Player();