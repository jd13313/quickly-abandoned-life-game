export default class CollisionManager {
    constructor(scene, entityManager) {
        this.scene = scene;
        this.entityManager = entityManager;
        this.collisionCooldowns = new Map();
    }

    setupCollisions(snakeGroup, ratGroup) {
        this.scene.physics.add.collider(snakeGroup, ratGroup, this.handleSnakeRatCollision.bind(this));
        this.scene.physics.add.collider(snakeGroup, snakeGroup, this.handleSnakeSnakeCollision.bind(this));
    }

    handleSnakeRatCollision(snakeSprite, ratSprite) {
        console.log('snake collided with rat');
        ratSprite.destroy();
        snakeSprite.stats.hunger += 20;
        this.entityManager.removeRat(ratSprite);
    }

    handleSnakeSnakeCollision(snake1Sprite, snake2Sprite) {
        const pairId = [snake1Sprite, snake2Sprite].sort().join('-');
        const now = Date.now();

        if (this.collisionCooldowns.has(pairId)) {
            const lastCollision = this.collisionCooldowns.get(pairId);
            if (now - lastCollision < 2000) {
                return;
            }
        }

        console.log('two snakes collided');
        this.collisionCooldowns.set(pairId, now);

        const babySnake = this.entityManager.addSnake(snake1Sprite.x, snake1Sprite.y);
        babySnake.stats.hunger = 100;

        snake2Sprite.x -= 5;
        snake2Sprite.y -= 5;
        snake2Sprite.stats.hunger -= 20;

        snake1Sprite.x += 5;
        snake1Sprite.y += 5;
        snake1Sprite.stats.hunger -= 20;
    }
}
