import Phaser from 'phaser';

export default class Rat {
    constructor(scene, x, y, texture = 'rat1') {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture);

        this.sprite.stats = {
            speed: Phaser.Math.FloatBetween(1.4, 4.2),
            health: Phaser.Math.Between(5, 100),
            hunger: Phaser.Math.Between(5, 100)
        };
    }

    get x() {
        return this.sprite.x;
    }

    get y() {
        return this.sprite.y;
    }

    get stats() {
        return this.sprite.stats;
    }

    get body() {
        return this.sprite;
    }

    moveRandom() {
        const axisFlip = Phaser.Math.Between(0, 1);
        const directionFlip = Phaser.Math.Between(0, 1);
        const speed = this.sprite.stats.speed;

        switch(axisFlip) {
            case 0:
                this.sprite.y = directionFlip ? this.sprite.y + speed : this.sprite.y - speed;
                break;
            case 1:
                this.sprite.x = directionFlip ? this.sprite.x + speed : this.sprite.x - speed;
                break;
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}
