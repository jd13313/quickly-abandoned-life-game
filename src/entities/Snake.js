import Phaser from 'phaser';

export default class Snake {
    constructor(scene, x, y, texture = 'snakesGreen') {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture);

        this.sprite.stats = {
            speed: Phaser.Math.FloatBetween(0.7, 3.5),
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

    get health() {
        return this.sprite.stats.health;
    }

    moveTowards(target) {
        const speed = this.sprite.stats.speed;

        if (this.sprite.x > target.x) {
            this.sprite.x -= speed;
        } else if (this.sprite.x < target.x) {
            this.sprite.x += speed;
        }

        if (this.sprite.y > target.y) {
            this.sprite.y -= speed;
        } else {
            this.sprite.y += speed;
        }
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

    isHungry() {
        return this.sprite.stats.hunger < 50;
    }

    feed(amount) {
        this.sprite.stats.hunger += amount;
    }

    decreaseHunger(amount) {
        this.sprite.stats.hunger -= amount;
    }

    decreaseHealth(amount) {
        const potentialHealth = this.sprite.stats.health - amount;
        if (potentialHealth >= 0){
            this.sprite.stats.health -= amount;
            return;
        }

        this.sprite.stats.health = 0;
    }

    destroy() {
        this.sprite.destroy();
    }
}
