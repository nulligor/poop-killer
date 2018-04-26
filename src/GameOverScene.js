class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameOverScene'});
    }
    create() {
        this.pressX = this.add.bitmapText(this.sys.game.config.width/6, 
                                          this.sys.game.config.height/2, 
                                          'font', 
                                          "PRESS X TO PLAY AGAIN", 15);
        this.add.bitmapText(this.sys.game.config.width/6, 
        this.sys.game.config.height/6, 
        'font', 
        "YOU DEFEATED THE POOP MONSTER!!", 15);                                          
        this.blink = 1000;
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.add.image(this.sys.game.config.width/1.3, 
            this.sys.game.config.height/1.5, 'diploma')
    }
    update(time, delta) {
        this.blink-=delta;
        if(this.blink<0){
            this.pressX.alpha = this.pressX.alpha === 1 ? 0 : 1;
            this.blink = 500;
        }
        if(this.startKey.isDown){
            this.scene.start('MainScene');
        }
    }    
}

export default GameOverScene;
