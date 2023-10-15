import Phaser from 'phaser';

class Play extends Phaser.Scene {
    constructor() {
        super("Play");
    }

    create() {
        this.add.tileSprite(0, 0, 640, 480, 'grass').setOrigin(0, 0);

        this.snakes = this.createGroup('snakes', 'snakesGreen', 10, {
            speed: Phaser.Math.Between(1, 5),
            health: Phaser.Math.Between(5, 100),
            hunger: Phaser.Math.Between(5, 100),
        });
        
        this.rats = this.createGroup('rats', 'rat1', 30, {
            speed: Phaser.Math.Between(2, 6),
            health: Phaser.Math.Between(5, 100),
            hunger: Phaser.Math.Between(5, 100),
        });
        
        this.addRandomImages({
            flowerRed: 10,
            flowerBlue: 30,
            flowerYellow: 20,
            flowerGreen: 35,
            rock1: 10
        });

        this.physics.add.collider(this.snakes, this.rats, (snake, rat) => {
            console.log('snake collided with rat');
            rat.destroy();
            snake.stats.hunger += 20;
        });

        this.physics.add.collider(this.snakes, this.snakes, (snake1, snake2) => {
            console.log('two snakes collided');
            this.snakes.add({
                ...snake1,
                stats: {
                    ...snake1.stats,
                    hunger: 100
                }
            });

            snake2.x -= 5;
            snake2.y -= 5;
            snake2.stats.hunger -= 20;

            snake1.x += 5;
            snake1.y += 5;
            snake1.stats.hunger -= 20;
        });

    };

    createGroup(groupName, image, count, stats) {
        let { width, height } = this.sys.game.canvas;
        const sprites = [];

        for (let i = 0; i < count; i++) {
            const randomX = Phaser.Math.Between(0, width);
            const randomY = Phaser.Math.Between(0, height);
            const sprite = this.add.sprite(randomX, randomY, image);
            sprite.stats = stats;

            sprites.push(sprite);
        }

        return this.physics.add.group(sprites, { key: groupName });
    };

    update(time, delta) {
        this.snakes.children.entries.forEach(snake => {
            if (snake.stats.hunger >= 50) {
                this.moveSpriteRandom(snake);
                snake.stats.hunger -= 0.5;
            } else {
                const nearestRat = this.findNearestRat(this.snakeGreen);
                if (snake.x > nearestRat.x) {
                    snake.x -= snake.stats.speed;
                } else if (snake.x < nearestRat.x) {
                    snake.x += snake.stats.speed;
                }

                if (snake.y > nearestRat.y) {
                    snake.y -= snake.stats.speed;
                } else {
                    snake.y += snake.stats.speed;
                }
            }
        });


        this.rats.children.entries.forEach(rat => {
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

    // Find the nearest rat to the given snake
    findNearestRat(snake) {
        const nearestRat = this.rats.children.entries.reduce((prevRat, currRat) => {
            const prevRatDistance = Phaser.Math.Distance.Between(snake.x, snake.y, prevRat.x, prevRat.y);
            const currRatDistance = Phaser.Math.Distance.Between(snake.x, snake.y, currRat.x, currRat.y);

            return prevRatDistance <= currRatDistance ? prevRat : currRat;
        }, 0);


        return nearestRat;
    }
}

export default Play;