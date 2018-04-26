class BootScene extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'});
    }
    preload() {
        this.load.image('bossTitle', 'assets/img/boss.png');
        this.load.image('diploma', 'assets/img/diploma.png');
        this.load.image('ground', 'assets/img/platform.png');
        this.load.image('boss_bullet', 'assets/img/boss_bullet.png');
        this.load.image('bullet', 'assets/img/bullet.png');
        this.load.image('background', 'assets/img/background.png');

        this.load.spritesheet('contra', 'assets/sprites/contra.png', { frameWidth: 45, frameHeight: 47 });
        this.load.spritesheet('boss', 'assets/img/boss_2.png',  { frameWidth: 360, frameHeight: 313 });

        this.load.bitmapFont('font', 'assets/font/font.png', 'assets/font/font.fnt');
    }
    create() {
        console.log("BOOTED");
        this.scene.start('TitleScene');
    }    
}

export default BootScene;