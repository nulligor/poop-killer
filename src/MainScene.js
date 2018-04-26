// ===========================================================================
// GLOBALS
let shotTimer = 0;
let poopTimer = [0, 0, 0,];
let pathCounter = 0;

// ===========================================================================
// HELPER FUNCTIONS
function hitBoss(boss, bullet) {
    bullet.disableBody(true, true);
    boss.HP = boss.HP - 5;
    boss.text.destroy();
    boss.text = this.add.bitmapText(this.sys.game.config.width/10, 
        this.sys.game.config.height/5, 
        'font', 
        "BOSS HP " + boss.HP, 15);
}

function killPlayer(player, entity) {
    return player.alive = false;
}

function bossMoveSet_1(boss, bullets, time) {
    // Shot Patterns
    if(pathCounter < 400) {
        shootPoopLeft(time, bullets, 0, boss);
        shootPoopLeft(time, bullets, 1, boss);
        shootPoopLeft(time, bullets, 2, boss);
    } else {
        shootPoopRight(time, bullets, 0, boss);
        shootPoopRight(time, bullets, 1, boss);
        shootPoopRight(time, bullets, 2, boss);
    }

    // Main Boss Path
    if (pathCounter < 100)  {
        boss.body.velocity.x = -50;
        boss.body.velocity.y = Math.sin(pathCounter) * 2 + 100;
    } else if (pathCounter < 250) {
        boss.body.velocity.x = -100;
        boss.body.velocity.y = -(Math.sin(pathCounter) * 2 + 100);
    } 
    else if (pathCounter < 300) {
        boss.body.velocity.x = +100;
        boss.body.velocity.y = +(Math.sin(pathCounter) * 2 + 100);
    } 
    else {
        boss.body.velocity.x = 0;
        boss.body.velocity.y = 0;
    }
}

function bossMoveSet_2(boss, bullets, time) {
    // Shot Patterns
    if(pathCounter < 400) {
        shootPoopRight(time, bullets, 0, boss);
        shootPoopRight(time, bullets, 1, boss);
        shootPoopRight(time, bullets, 2, boss);
    } else {
        shootPoopLeft(time, bullets, 0, boss);
        shootPoopLeft(time, bullets, 1, boss);
        shootPoopLeft(time, bullets, 2, boss);
    }

    // Secondary Boss Path
    if (pathCounter < 100)  {
        boss.body.velocity.x = +150;
        boss.body.velocity.y = Math.sin(pathCounter) * 2 + 100;
    } else if (pathCounter < 250) {
        boss.body.velocity.x = -100;
    } 
    else if (pathCounter < 300) {
        boss.body.velocity.x = +50;
    } 
    else {
        bossMoveSet_1(boss, bullets, time);
    }
}

function shootPoopLeft(time, bullets, direction , boss) {
    if (poopTimer[direction] < time.now && Object.keys(bullets).length != 0) {
        poopTimer[direction] = time.now + 700;
        let bullet;
        bullet = bullets.create(boss.body.x + boss.body.width  - 200 * direction, 
                                boss.body.y + boss.body.height / 150 * direction, 'boss_bullet');
        bullet.setVelocityY(-200);
        bullet.setVelocityX(-150);
        bullet.setAccelerationY(-500);
        bullet.outOfBoundsKill = true;
    }    
}

function shootPoopRight(time, bullets, direction , boss) {
    if (poopTimer[direction] < time.now && Object.keys(bullets).length != 0) {
        poopTimer[direction] = time.now + 700;
        let bullet;
        bullet = bullets.create(boss.body.x + boss.body.width - 200 * direction, 
                                boss.body.y + boss.body.height / 150 * direction, 'boss_bullet');
        bullet.setVelocityY(150);
        bullet.setVelocityX(150);
        bullet.setAccelerationY(100);
        bullet.outOfBoundsKill = true;
    }    
}

function shoot(time, bullets, facing, player) {
    if (shotTimer < time.now) {
        shotTimer = time.now + 400;
        let bullet;
        if (facing == 'left') {
            bullet = bullets.create(player.body.x + player.body.width - 50, 
                                    player.body.y + player.body.height / 2 - 4, 'bullet');
        } else {
            bullet = bullets.create(player.body.x + player.body.width, 
                                    player.body.y + player.body.height / 2 - 4, 'bullet');
        }
        bullet.setVelocityY(-250);
        bullet.setAccelerationY(-250);
        bullet.outOfBoundsKill = true;
        if (facing == 'right') {
            bullet.setVelocityX(700);
        } else {
            bullet.setVelocityX(-700);
        }
    }
}

// ===========================================================================
// CLASS
class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'});
    }
    create() {
        //  Background
        this.add.tileSprite(this.sys.game.config.width/2, 
                            this.sys.game.config.height/2.1, 960, 540, 'background');
        //  Ground
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(400, 400, 'ground').refreshBody();

        //  Player
        this.player = this.physics.add.sprite(100,230,'contra');
        this.player.setBounce(0.2);
        this.player.alive = true;
        this.player.setGravityY(500);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);
        this.facing = 'right';

        //  Player  Bullets
        this.bullets = this.physics.add.group();

        //  Player Animations
        this.anims.create({
            key: 'player_left',
            frames: this.anims.generateFrameNumbers('contra', { start: 8, end: 15 }),
            frameRate: 12,
            repeat: -1
        });
        
        this.anims.create({
            key: 'player_right',
            frames: this.anims.generateFrameNumbers('contra', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
        });
       
        this.anims.create({
            key: 'player_idle_left',
            frames: this.anims.generateFrameNumbers('contra', { start: 8, end: 8 }),
            frameRate: 12,
            repeat: -1
        });
        
        this.anims.create({
            key: 'player_idle_right',
            frames: this.anims.generateFrameNumbers('contra', { start: 0, end: 0 }),
            frameRate: 12,
            repeat: -1
        });

        //  Keyboard
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.cursors = this.input.keyboard.createCursorKeys();

        //  Boss
        this.boss = this.physics.add.sprite(750, 200,'boss');
        
        this.boss.HP = 100;
        this.boss.setGravityY(-900);
        this.boss.setCollideWorldBounds(false);
        this.boss.text = this.add.bitmapText(this.sys.game.config.width/10, 
            this.sys.game.config.height/5, 
            'font', 
            "BOSS HP " + this.boss.HP, 15);
            
        //  Boss Bullets
        this.bossBullets = this.physics.add.group();
    }
    update() {        
        // ===========================================================================
        //  PLAYER CONTROLS
        
        //  Walk
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(170);
            this.player.anims.play('player_right', true);
            this.facing = 'right';
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-170);
            this.player.anims.play('player_left', true);
            this.facing = 'left';
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('player_idle_' + this.facing, true);
        }
        
        //  Jump
        if (this.jumpKey.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-650);
        }    
        
        //  Shoot
        if (this.fireKey.isDown) {
            shoot(this.time, this.bullets, this.facing, this.player);
        }    
        if(!this.player.alive) {
            pathCounter = 0;
            this.scene.start('MainScene');
        }
        
        //  COLLIDERS
        this.physics.add.collider(this.bossBullets, this.player, killPlayer, null, this);
        this.physics.add.collider(this.bullets, this.boss, hitBoss, null, this);
        
        // ===========================================================================
        //  BOSS ACTIONS
       
        //   Move
        pathCounter += 1;
        if(pathCounter >= 650) {
            pathCounter = 0;
        }
        if(this.time.now >= 30000) {
            this.boss.setCollideWorldBounds(true);
            bossMoveSet_2(this.boss, this.bossBullets, this.time);
        } else {
            bossMoveSet_1(this.boss, this.bossBullets, this.time);
        }
        //   Die and trigger Game Over
        if(this.boss.HP <= 0) {
            this.scene.start('GameOverScene');
        }
    }
}


export default MainScene;
