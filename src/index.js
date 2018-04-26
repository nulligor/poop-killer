import 'phaser';
import BootScene from './BootScene';
import TitleScene from './TitleScene';
import MainScene from './MainScene';
import GameOverScene from './GameOverScene';

let config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 800,
    height: 575,
    scaleMode: 0,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [
        BootScene,
        TitleScene,
        MainScene,
        GameOverScene
    ]
};

let game = new Phaser.Game(config);