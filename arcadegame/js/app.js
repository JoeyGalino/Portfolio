let deaths = 0;

// Enemies our player must avoid
var Enemy = function({x = -100, y = randBug(), speed = 1} = {}) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x += this.speed * dt;
        if (this.x >= 525) { 
            this.x = -50; 
            let random = randBug();
            this.y = random;
        }
        collisionCheck(this.y, this.x);
 //       const bugNumber = allEnemies.length;
 //       allEnemies.push(this[bug + bugNumber] = new Enemy());

    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
//    global.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x = 200, y = 380){
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(myKey){
        switch(myKey){
            case 'left':
                if (this.x != 0) { this.x -= 100; }
                console.log(this.x);
                break;
            case 'up':
                this.y -= 80;
                if (this.y == -20) { winGame(); }
                break;
            case 'right':
                if (this.x != 400) { this.x += 100; }
                console.log(this.x);
                break;
            case 'down':
                if (this.y != 380) { this.y += 80; }
                console.log(this.y);
                break;
        }
        if (this.x == gem.x && this.y == gem.y) { getGem(); }
    }
    update(collide){
        if (collide == true) {
            this.x = 200;
            this.y = 380;
        }
    }
}

class Gem {
 constructor() {
    const [y, x] = gemSpawn();
    this.x = x;
    this.y = y;
    console.log(x);
    console.log(y + 'this y');
    this.sprite = 'images/gem-blue.png';
   //this.sprite = 'images/char-boy.png';
 }
 render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
}

function randBug() {
   /* let random = Math.random();
    random = random * 100;
    random = Math.round(random);   */
    let random = randomGenerator(4, 1);
    switch(random) {
        case 1:
            random = 60;
        break;
        case 2:
            random = 140;
        break;
        case 3:
            random = 220;
        break;
        case 4:
            random = 300;
        break;
    }
    return random;
}

function randomGenerator(firstOdds, secondOdds){
    let random = Math.floor(Math.random() * firstOdds) + secondOdds;
    return random;
}

function collisionCheck(y, x){
    if (player.y == y && player.x >= x - 50 && player.x <= x + 50) {
        let collide = true;
        player.update(collide);
        const deathCounter = document.querySelector('.deaths');
        deaths += 1;
        deathCounter.textContent = 'Deaths: ' + deaths;
        console.log('collide' + player.x + ' ' + x);
    }
}

function gemSpawn(){
    let randomY = randomGenerator(4, 1);
    let randomX = randomGenerator(5, 1); 
    console.log(randomY + 'random y');   
    let coord = [randomY * 80 - 20, randomX * 100 - 100];
    return coord;
}

function getGem(){
    bug1.speed = bug1.speed * .5;
    bug2.speed = bug2.speed * .5;
    bug3.speed = bug3.speed * .5;
    gem.x = 1000;
    console.log('gem x ' + gem.x);
}

function winGame(){
    player.x = 200;
    player.y = 380;
    alert('You win!!!');
}

// Now instantiate your objects.
const bug1 = new Enemy({speed: 100});
const bug2 = new Enemy({speed: 150});
const bug3 = new Enemy({speed: 200});

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);
// Place the player object in a variable called player
const player = new Player;

const gem = new Gem;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});