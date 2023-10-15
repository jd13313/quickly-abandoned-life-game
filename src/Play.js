import Phaser from 'phaser';

class Play extends Phaser.Scene {
    constructor() {
        super("Play");
    }

    create() {
        this.add.tileSprite(0, 0, 640, 480, 'grass').setOrigin(0, 0);
        
        this.snakeGreen = this.add.sprite(200, 200, 'snakeGreen');
        this.snakeGreen['stats'] = {
            speed: 1,
            health: 100,
        }
        this.snakeBlue = this.add.sprite(300, 300, 'snakeBlue');

        this.addRandomImages({
            flowerRed: 10,
            flowerBlue: 30,
            flowerYellow: 20,
            flowerGreen: 35,
            rock1: 10
        });

        this.rats = this.addRandomImages({
            rat1: 20
        }, true);

    }

    update(time, delta) {
        this.moveSpriteRandom(this.snakeGreen);
        this.moveSpriteRandom(this.snakeBlue);

        this.rats.forEach(rat => {
            this.moveSpriteRandom(rat);
        });
    }

    addRandomImages(countObj, makeSprites = false) {
        let { width, height } = this.sys.game.canvas;
        const spritesList = [];

        Object.entries(countObj).forEach(([spriteName, count]) => {
            for (let i = 0; i < count; i++) {
                const randomX = Phaser.Math.Between(0, width);
                const randomY = Phaser.Math.Between(0, height);

                if (makeSprites) {
                    spritesList.push(this.add.sprite(randomX, randomY, spriteName));
                } else {
                    this.add.image(randomX, randomY, spriteName);
                }
            }
        });

        if (spritesList.length) return spritesList;
    }

    moveSpriteRandom(sprite) {
        const axisFlip = Phaser.Math.Between(0, 1);
        const directionFlip = Phaser.Math.Between(0, 1);
        const speed = sprite?.stats?.speed || 1;

        switch(axisFlip) {
            case 0:
                sprite.y = directionFlip ? sprite.y += speed : sprite.y -= speed;
                break;
            case 1:
                sprite.x = directionFlip ? sprite.x += speed : sprite.x -= speed;
                break;
        }
        
    }
}

export default Play;