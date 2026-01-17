import Phaser from 'phaser';
import Snake from '../entities/Snake.js';
import Rat from '../entities/Rat.js';

export default class EntityManager {
    constructor(scene) {
        this.scene = scene;
        this.snakes = [];
        this.rats = [];
    }

    createSnakes(count) {
        const { width, height } = this.scene.sys.game.canvas;

        for (let i = 0; i < count; i++) {
            const randomX = Phaser.Math.Between(0, width);
            const randomY = Phaser.Math.Between(0, height);
            const snake = new Snake(this.scene, randomX, randomY);
            this.snakes.push(snake);
        }

        return this.getSnakeSprites();
    }

    createRats(count) {
        const { width, height } = this.scene.sys.game.canvas;

        for (let i = 0; i < count; i++) {
            const randomX = Phaser.Math.Between(0, width);
            const randomY = Phaser.Math.Between(0, height);
            const rat = new Rat(this.scene, randomX, randomY);
            this.rats.push(rat);
        }

        return this.getRatSprites();
    }

    getSnakeSprites() {
        return this.snakes.map(snake => snake.body);
    }

    getRatSprites() {
        return this.rats.map(rat => rat.body);
    }

    addSnake(x, y) {
        const snake = new Snake(this.scene, x, y);
        this.snakes.push(snake);
        return snake;
    }

    removeRat(ratSprite) {
        const index = this.rats.findIndex(rat => rat.body === ratSprite);
        if (index !== -1) {
            this.rats.splice(index, 1);
        }
    }

    updateSnakes() {
        this.snakes.forEach((snake, index) => {
            let healthImpactedByHunger = .5;

            if (snake.isHungry) {
                const nearestRat = this.findNearestRat(snake);

                if (!nearestRat) {
                    snake.moveRandom();
                    return;
                }
                snake.moveTowards(nearestRat);
                healthImpactedByHunger = 1;
            } else{
                snake.moveRandom();
                snake.decreaseHunger(0.5);
            }

            snake.decreaseHealth(healthImpactedByHunger);

            if (snake.health === 0) {
                snake.destroy();
                this.snakes.splice(index, 1);
            }
        });
    }

    updateRats() {
        this.rats.forEach(rat => {
            rat.moveRandom();
        });
    }

    findNearestRat(snake) {
        if (this.rats.length === 0) return null;

        return this.rats.reduce((nearest, current) => {
            const nearestDistance = Phaser.Math.Distance.Between(
                snake.x,
                snake.y,
                nearest.x,
                nearest.y
            );
            const currentDistance = Phaser.Math.Distance.Between(
                snake.x,
                snake.y,
                current.x,
                current.y
            );

            return nearestDistance <= currentDistance ? nearest : current;
        });
    }
}
