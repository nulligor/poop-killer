class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: 'TitleScene'});
    }
    create() {
        this.pressX = this.add.bitmapText(this.sys.game.config.width/6, 
                                          this.sys.game.config.height/2, 
                                          'font', 
                                          "PRESS X TO START", 15);
        this.blink = 1000;
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.tweens.add({
            targets: this.add.image(this.sys.game.config.width/1.3, 
                     this.sys.game.config.height, 'bossTitle'),
            y: 450,
            duration: 2000,
            ease: 'Power3',
            yoyo: true,
            loop: -1
        });
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

export default TitleScene;
