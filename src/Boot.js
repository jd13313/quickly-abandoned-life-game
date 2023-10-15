import Phaser from 'phaser';

class Boot extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload(){
        this.load.image('snakeGreen', '../assets/snakes/snake-green.png');
        this.load.image('snakeBlue', '../assets/snakes/snake-blue.png');
        this.load.image('grass', '../assets/plants/grass.png');
        this.load.image('flowerRed', '../assets/plants/flower-red.png');
        this.load.image('flowerBlue', '../assets/plants/flower-blue.png');
        this.load.image('flowerYellow', '../assets/plants/flower-yellow.png');
        this.load.image('flowerGreen', '../assets/plants/flower-green.png');
        this.load.image('rock1', '../assets/rock-1.png');
        this.load.image('rat1', '../assets/animals/rat.png');
    }

    create() {
        this.scene.start('Play');
    }
}

export default Boot;