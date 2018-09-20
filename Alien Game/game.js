// 1. declare and define vars

var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var won = false;
var currentScore = 0;
var winningScore = 100;
var winningMessage;

//////////////CUSTOM FUNCTIONS/////////////////

//all functions go into preload
// 4a create the items works with create functions so it tells images to appear and animate
function createItems(left, top, image){
    var item = items.create(left, top, image);
    item.animations.add('spin');
    item.animations.play('spin', 8, true);
}

// 4b add getable items to the game
function addItems(){
    items = game.add.physicsGroup();
    //physicsgroup called on anything that moves and isnt the player
    createItems(430, 100, 'slime');
    createItems(700, 420, 'slime');
    createItems(230, 200, 'slime');
    createItems(230, 350, 'slime');
    createItems(430, 250, 'slime');
    createItems(600, 420, 'alien'); 
    createItems(30, 400, 'alien'); 
    createItems(490, 520, 'water');
    createItems(640, 220, 'water');
    createItems(50, 100, 'water');
}

// 4c add platforms
function addPlatforms(){
    platforms = game.add.physicsGroup();
    platforms.create(0, 475, 'platform1').scale.setTo(0.15);
    platforms.create(600, 490, 'platform1').scale.setTo(0.15);
    platforms.create(700, 490, 'platform1').scale.setTo(0.15);
    platforms.create(200, 290, 'platform1').scale.setTo(0.15);
    platforms.create(400, 180, 'platform1').scale.setTo(0.15);
    platforms.create(600, 150, 'platform2').scale.setTo(0.15);
    //other platforms go here
    platforms.setAll('body.immovable', true);
    //change to false and platforms will move
}

// 5b create winning badge to add to screen win == true
function createBadge(){
    badges = game.add.physicsGroup();
    var badge = badges.create(620, 80, 'badge');
    badge.animations.add('spin');
    badge.animations.play('spin', 10, true);
}

// 5a when item collected
function itemHandler(player, item){
    item.kill();
    if(item.key === 'slime'){
        currentScore = currentScore + 10;
    }
    else if(item.key === 'water'){
//        currentScore = currentScore - 25;
        player.reset(300,600);
    }
    else if(item.key === 'alien'){
        currentScore = currentScore + 25;
    }
    if(currentScore === winningScore){
        createBadge();
    }
}



// 5c collects badge at end
function badgeHandler(player, badge){
    badge.kill();
    won = true;
}

//////////////MAIN PROGRAM/////////////////////

// 2. setup game when webpage loads

window.onload = function () {
    game = new Phaser.Game (800, 600, Phaser.AUTO, '#0f6afc', { preload: preload, create: create, update: update, render: render}); 
    
// 3. define preload function, loading assets/images/spritesheets
    
    function preload(){
        //background color
        game.stage.backgroundColor = "#1b3818";
        //load static images first then sprites
        game.load.image('platform1', "platform1.png");
        game.load.image('platform2', "platform2.png");
        //whole width of sheet divided by number of sprites in sheet is the width parameter and height parameter stays the same...FINISH REST
        game.load.spritesheet('player', "character.png", 141, 134);
        game.load.spritesheet('slime', "slime.png", 44, 40);
        game.load.spritesheet('badge', "badge.png", 73, 40);
        game.load.spritesheet('water', "water.png", 51, 25);
        game.load.spritesheet('alien', "alien.png", 44, 40);

        //key, url --- parameters
//        game.load.images();
        //load sprites
    }
    
// 4. display the images
    
    function create (){
        //player game physics
        player = game.add.sprite(300, 600, 'player');
        player.animations.add('walk');
        player.anchor.setTo(0.5, 1);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 400;
        
        addItems();
        addPlatforms();
        
        //basic game functions
        //4a 4a already holds 4b with it
        //4c
        //load images into game
        //keyboard and cursor functionality
        //denote type and messages
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        text = game.add.text(16, 16, "SCORE: " + currentScore, {
            font: "bold 24px Arial", fill:"white"
        });
        
        winningMessage = game.add.text(game.world.centerX, 275, "", {
            font: "bold 48px Arial", fill: "white"
        });
        
        winningMessage.anchor.setTo(0.5, 1);
    }
    
// 5. do stuff while game running
    function update(){
        //chain the score to the text
        //take care of overlaps and collisions
        //control player velocity
        //conditional statement for movements
        text.text = "SCORE: " + currentScore;
        
        game.physics.arcade.collide(player, platforms);
        
        game.physics.arcade.overlap(player, items, itemHandler);
        
        game.physics.arcade.overlap(player, badges, badgeHandler);
        
        player.body.velocity.x = 0;
        
        if(cursors.left.isDown){
            player.animations.play('walk', 10, true);
            player.body.velocity.x = -300;
            player.scale.x = -1;
        }
        else if(cursors.right.isDown){
            player.animations.play('walk', 10, true);
            player.body.velocity.x = 300;
            player.scale.x = 1;
        }
        else{
            player.animations.stop();
        }
        
        if(jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
            player.body.velocity.y = -400;
        }
        
        if (won) {
            winningMessage.text = "YOU WIN!!!";
        }
    }
    
    
    function render(){}
    
};












