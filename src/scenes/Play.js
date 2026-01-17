import Phaser from 'phaser';
import EntityManager from '../managers/EntityManager.js';
import CollisionManager from '../managers/CollisionManager.js';
import { ENVIRONMENT_OBJECTS } from '../config/AssetConfig.js';
import { addRandomImages } from '../utils/SceneHelpers.js';

class Play extends Phaser.Scene {
    constructor() {
        super("Play");
    }

    create() {
        this.add.tileSprite(0, 0, 640, 480, 'grass').setOrigin(0, 0);

        this.entityManager = new EntityManager(this);
        this.collisionManager = new CollisionManager(this, this.entityManager);

        const snakeSprites = this.entityManager.createSnakes(10);
        const ratSprites = this.entityManager.createRats(30);

        this.snakeGroup = this.physics.add.group(snakeSprites);
        this.ratGroup = this.physics.add.group(ratSprites);

        this.collisionManager.setupCollisions(this.snakeGroup, this.ratGroup);

        addRandomImages(this, ENVIRONMENT_OBJECTS);
    }

    update(time, delta) {
        this.entityManager.updateSnakes();
        this.entityManager.updateRats();
    }
}

export default Play;
